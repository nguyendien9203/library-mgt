import {
    useContext,
    useEffect,
    useState,
    createContext
} from 'react';
import {
    login as performLogin,
    sendOtp as performSendOtp,
    verify as performVerify,
    resend as performResend,
    register as performRegister,
    oAuth2Login as performOAuth2Login,
    forgotPassword as performForgotPassword,
    resetPassword as performResetPassword
} from '../../service/AuthService';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const decodeToken = (token) => {
        const decodedToken = jwtDecode(token);
        setUser({
            email: decodedToken.sub,
            id: decodedToken.userId,
            fullName: decodedToken.fullName,
            role: decodedToken.role
        });
    };

    const setUserFromToken = () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            decodeToken(token);
        }
    };

    useEffect(() => {
        setUserFromToken();
    }, []);




    const login = async (loginData) => {
        try {
            const response = await performLogin(loginData);
            console.log("response", response);
            if (response.status === 200) {
                const jwtToken = response.data.token;
                localStorage.setItem("access_token", jwtToken);
                decodeToken(jwtToken);
               
            } else if (response.status === 302) {
                localStorage.setItem("email", loginData.email);
            }
            return response;
        } catch (error) {
            throw error;
        }
    };

    console.log("sdfds", user);




    const verify = async (email, otp) => {
        try {
            const response = await performVerify(email, otp);
            if (response.status === 200) {
                const jwtToken = response.data.token;
                localStorage.setItem("access_token", jwtToken);
                localStorage.removeItem("email");
                decodeToken(jwtToken);
            } else {
                throw new Error(response.message);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    const sendOtp = async (email) => {
        try {
            const response = await performSendOtp(email);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            throw error;
        }
    }

    const resend = async (email) => {
        try {
            const response = await performResend(email);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            throw error;
        }
    }

    const register = async (registerData) => {
        try {
            const response = await performRegister(registerData);
            if (response.status === 201) {
                localStorage.setItem("email", registerData.email);
                return response;
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            throw error;
        }
    }

    const oAuth2Login = async (tokenId) => {
        try {
            const response = await performOAuth2Login(tokenId);
            if (response.status === 200) {
                const jwtToken = response.data.token;
                localStorage.setItem("access_token", jwtToken);
                decodeToken(jwtToken);
            } else {
                throw new Error(response.message);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    const forgotPassword = async (email) => {
        try {
            const response = await performForgotPassword(email);
            if (response.status === 200) {
                localStorage.setItem("email", email);
                return response;
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            throw error;
        }
    }

    const resetPassword = async (otp, email, newPassword) => {
        try {
            const response = await performResetPassword(otp, email, newPassword);
            if (response.status === 200) {
                localStorage.removeItem("email");
                return response;
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            throw error;
        }
    }


    const logout = () => {
        localStorage.removeItem("access_token");
        setUser(null);
    }

    const isUserAuthenticated = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
            logout();
            return false;
        }
        return true;
    }

    const isAdmin = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        const { role } = jwtDecode(token);
        return role === "ADMIN";
    };

    const isMember = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        const { role } = jwtDecode(token);
        return role === "MEMBER";
    };

    const isLibrarian = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        const { role } = jwtDecode(token);
        return role === "LIBRARIAN";
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            sendOtp,
            verify,
            resend,
            register,
            forgotPassword,
            resetPassword,
            oAuth2Login,
            logout,
            isUserAuthenticated,
            isAdmin,
            isMember,
            isLibrarian,
            setUserFromToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
