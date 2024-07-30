import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Notification from '../../common/Notification';
import { Button, Form, Spinner } from 'react-bootstrap';
import TextInput from '../../common/TextInput';
import { useAuth } from '../../context/AuthContext';
import useNotification from '../../../hooks/useNotification';
import { updateMemberSub } from '../../../service/MemberShipService';
import { getBenefits } from '../../../service/BenefitService';

const EditMembership = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const { showError, showSuccess } = useNotification();
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        subId: 0,
        email: user?.email,
        nameSubscription: '',
        fee_member: '',
        expireDate: '',
        maxBook: '',
        selectedBenefits: []
    });

    const [errors, setErrors] = useState({
        nameSubscription: '',
        fee_member: '',
        expireDate: '',
        maxBook: ''
    });

    const [benefits, setBenefits] = useState([]);

    const fetchBenefits = async () => {
        await getBenefits().then(resp => {
            if (resp?.status === 200) {
                setBenefits(resp?.data)
            }
        })
    }

    useEffect(() => {
        if (location?.state && location?.state?.data) {
            const data = location?.state?.data
            console.log(data);
            setFormData({
                subId: data?.id,
                email: user?.email,
                nameSubscription: data?.nameSubscription,
                fee_member: data?.feeMember,
                expireDate: data?.expireDate,
                maxBook: data?.maxBook,
                selectedBenefits: data?.benefits || []
            })
            fetchBenefits();

            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'number' ? parseFloat(value) : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue
        }));

        validateForm(name, newValue);
    };

    // const handleBenefitChange = (e) => {
    //     const { value, checked } = e.target;

    //     setFormData((prevState) => {
    //         const selectedBenefits = checked
    //             ? [...prevState.selectedBenefits, value]
    //             : prevState.selectedBenefits.filter((benefit) => benefit !== value);

    //         return {
    //             ...prevState,
    //             selectedBenefits
    //         };
    //     });
    // };

    const handleBenefitChange = (e) => {
        const { value, checked } = e.target;

        setFormData((prevState) => {
            let updatedBenefits;

            if (checked) {
                // Add the benefit object to selectedBenefits if not already present
                if (!prevState.selectedBenefits.some(benefit => benefit?.id === value)) {
                    const selectedBenefit = benefits.find(benefit => benefit?.id === parseInt(value));
                    updatedBenefits = [...prevState.selectedBenefits, selectedBenefit];
                } else {
                    updatedBenefits = [...prevState.selectedBenefits];
                }
            } else {
                // Remove the benefit object from selectedBenefits
                updatedBenefits = prevState.selectedBenefits.filter(benefit => benefit.id !== parseInt(value));
            }

            return {
                ...prevState,
                selectedBenefits: updatedBenefits
            };
        });
    };



    // const validateForm = () => {
    //     const { nameSubscription, fee_member, maxBook } = formData;
    //     if (nameSubscription != undefined && nameSubscription.trim() === '') {
    //         return false;
    //     }
    //     if (parseFloat(fee_member) < 0 || parseFloat(maxBook) < 0) {
    //         return false;
    //     }
    //     return true;
    // }

    const validateForm = (name, value) => {
        let newErrors = { ...errors };
        let valid = true;

        const validateNameSubscription = (nameSubscription) => {
            if (!nameSubscription) {
                return 'Vui lòng nhập tên gói';
            }
            const regex = /^[a-zA-Z0-9 ]+$/;
            if (!regex.test(nameSubscription)) {
                return 'Tên gói không được chứa ký tự đặc biệt';
            }
            return '';
        }

        const validateFeeMember = (fee_member) => {
            const feePattern = /^[0-9]+$/;
            if(!fee_member) {
                return 'Vui lòng nhập giá gói';
            } else if (!feePattern.test(fee_member)) {
                return 'Giá gói không hợp lệ';
            } else if (parseInt(fee_member) < 0) {
                return 'Giá gói không thể nhỏ hơn 0';
            }
            return '';
        }

        const validateExpireDate = (expireDate) => {
            const expireDatePattern = /^[0-9]+$/;
            if (!expireDate) {
                return 'Vui lòng nhập thời hạn gói';
            } else if (!expireDatePattern.test(expireDate)) {
                return 'Thời hạn gói không hợp lệ';
            } else if (parseInt(expireDate) <= 0) {
                return 'Thời hạn gói không thể nhỏ hơn hoặc bằng 0';
            }
            return '';
        }

        const validateMaxBook = (maxBook) => {
            const maxBookPattern = /^[0-9]+$/;
            if (!maxBook) {
                return 'Vui lòng nhập số lượng sách tối đa';
            } else if (!maxBookPattern.test(maxBook)) {
                return 'Số lượng sách tối đa không hợp lệ';
            } else if (parseInt(maxBook) <= 0) {
                return 'Số lượng sách tối đa không thể nhỏ hơn hoặc bằng 0';
            }
            

            return '';
        }

        switch (name) {
            case 'nameSubscription':
                newErrors.nameSubscription = validateNameSubscription(value);
                if (newErrors.nameSubscription) {
                    valid = false;
                }
                break;
            case 'fee_member':
                newErrors.fee_member = validateFeeMember(value);
                if (newErrors.fee_member) {
                    valid = false;
                }
                break;
            case 'expireDate':
                newErrors.expireDate = validateExpireDate(value);
                if (newErrors.expireDate) {
                    valid = false;
                }
                break;
            case 'maxBook':
                newErrors.maxBook = validateMaxBook(value);
                if (newErrors.maxBook) {
                    valid = false;
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
        return valid;
    }

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateForm(name, value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm('nameSubscription', formData.nameSubscription) || !validateForm('fee_member', formData.fee_member) || !validateForm('expireDate', formData.expireDate) || !validateForm('maxBook', formData.maxBook)) {
            return;
        }

        // console.log(formData);
        setSubmitting(true);
        await new Promise(r => setTimeout(r, 2000));

        try {
            await updateMemberSub(formData).then(resp => {
                if (resp?.code === 200) {
                    showSuccess(resp?.data?.message);
                    setFormData({
                        subId: 0,
                        email: user?.email,
                        nameSubscription: '',
                        fee_member: 0,
                        expireDate: 0,
                        maxBook: 0,
                        selectedBenefits: []
                    });

                    navigate('/admin/membership', { state: { success: resp?.data?.message } });
                }
            }).catch(err => showError("error"));
            // await timer;


        } catch (error) {
            console.error("Lỗi sửa gói: ", error);
            setFormData({
                email: user?.email,
                nameSubscription: '',
                fee_member: 0,
                expireDate: 0,
                maxBook: 0,
                selectedBenefits: []
            });
            showError('Lỗi sửa gói');
        } finally {
            setSubmitting(false);
        }
    }


    return (
        <div style={{ margin: '0 200px' }}>
            <Notification />
            <div style={{ marginBottom: '20px' }}>
                <h5>Cập nhật gói thành viên</h5>
            </div>
            <Form onSubmit={handleSubmit}>

                <TextInput
                    label="Tên gói"
                    name="nameSubscription"
                    type="text"
                    placeholder="Nhập tên gói"
                    value={formData.nameSubscription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.nameSubscription}
                />
                <TextInput
                    label="Thời hạn của gói ( tháng )"
                    name="expireDate"
                    type="number"
                    placeholder="Nhập thời hạn của gói"
                    value={formData.expireDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.expireDate}
                />

                <TextInput
                    label="Giá"
                    name="fee_member"
                    type="number"
                    placeholder="Nhập giá"
                    value={formData.fee_member}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.fee_member}
                />

                <TextInput
                    label="Số lượng sách có thể thuê trong 1 tháng ( max )"
                    name="maxBook"
                    type="number"
                    placeholder="Nhập giá"
                    value={formData.maxBook}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.maxBook}
                />

                {benefits && <Form.Group className='mb-3'>
                    <Form.Label>Những điều khoản của gói thành viên</Form.Label>
                    {benefits.map((benefit, index) => {
                        return <Form.Check
                            type="checkbox"
                            label={benefit?.name}
                            value={benefit?.id}
                            checked={formData.selectedBenefits.some(obj => obj.id === benefit?.id)}
                            onChange={handleBenefitChange}
                            key={index}
                            style={{
                                fontSize: 'small',
                                margin: '0 10px'
                            }}
                        />
                    })}
                </Form.Group>}



                <Button
                    type="submit"
                    style={{
                        fontSize: 'small',
                        backgroundColor: '#F87555',
                        border: 'none'
                    }}
                    disabled={submitting}
                >
                    {submitting ? <Spinner animation="border" size="sm" /> : 'Lưu thay đổi'}
                </Button>
            </Form>

        </div>
    )
}

export default EditMembership