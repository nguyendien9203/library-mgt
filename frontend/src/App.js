import React from "react";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import AddAuthor from "./component/admin/author/AddAuthor";
import Author from "./component/admin/author/Author";
import EditAuthor from "./component/admin/author/EditAuthor";
import AddBook from "./component/admin/book/AddBook";
import Book from "./component/admin/book/Book";
import BookDetail from "./component/admin/book/BookDetail";
import EditBook from "./component/admin/book/EditBook";
import AddCategory from "./component/admin/category/AddCategory";
import Category from "./component/admin/category/Category";
import EditCategory from "./component/admin/category/EditCategory";
import Dashboard from "./component/admin/dashboard/Dashboard";
import AddMembership from "./component/admin/membership/AddMembership";
import EditMembership from "./component/admin/membership/EditMembership";
import Membership from "./component/admin/membership/Membership";
import RentComponent from "./component/admin/rent/RentComponent";
import ReturnComponent from "./component/admin/rent/ReturnComponent";
import AddUser from "./component/admin/user/AddUser";
import EditUser from "./component/admin/user/EditUser";
import User from "./component/admin/user/User";
import ForgotPassword from "./component/auth/ForgotPassword";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import ResetPassword from "./component/auth/ResetPassword";
import Verify from "./component/auth/Verify";
import Contribute from "./component/client/contribute/Contribute";
import Home from "./component/client/home/Home";
import MyShelf from "./component/client/myshelf/MyShelf";
import Search from "./component/client/search/Search";
import BookCategory from "./component/common/BookCategory";
import Layout from "./component/common/Layout";
import { AdminRoute, LibrarianRoute, ProtectedRoute } from "./routes/Guard";
import PaymentConfirm from "./component/payment/PaymenConfirm";
import Profile from "./component/client/profile/Profile";
import AboutUs from "./component/common/AboutUs";
import Support from "./component/common/Support";
import TermOfService from "./component/common/TermOfService";
import PrivacyPolicy from "./component/common/PrivacyPolicy";

const App = () => {
  return (
    <div className="App bg-light">
      <Container fluid>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="book/detail/:id" element={<BookDetail />} />
            <Route path="book/category/:parentCategoryId" element={<BookCategory />} />
            <Route path="book/category/:parentCategoryId/:subCategoryId" element={<BookCategory />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="support" element={<Support />} />
            <Route path="terms-of-service" element={<TermOfService />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          {/* Client Protected Routes */}
          <Route path="/" element={<ProtectedRoute element={<Layout />} />} >
            <Route path="profile" element={<Profile />} />
            <Route path="my-shelf" element={<MyShelf />} />
            <Route path="contribute" element={<Contribute />} />
          </Route>


          {/* Common Admin/Librarian Route */}
          <Route path="/admin" element={<ProtectedRoute element={<Layout />} />} >
            <Route index element={<Dashboard />} />

            {/* Admin-specific routes */}
            <Route path="user" element={<AdminRoute element={<User />} />} />
            <Route path="user/add" element={<AdminRoute element={<AddUser />} />} />
            <Route path="user/edit/:id" element={<AdminRoute element={<EditUser />} />} />

            {/* Librarian-specific routes */}
            <Route path="book" element={<LibrarianRoute element={<Book />} />} />
            <Route path="book/add" element={<LibrarianRoute element={<AddBook />} />} />
            <Route path="book/edit/:id" element={<LibrarianRoute element={<EditBook />} />} />
            <Route path="book/detail/:id" element={<LibrarianRoute element={<BookDetail />} />} />
            <Route path="book/return/" element={<LibrarianRoute element={<ReturnComponent />} />} />

            <Route path="category" element={<LibrarianRoute element={<Category />} />} />
            <Route path="category/add" element={<LibrarianRoute element={<AddCategory />} />} />
            <Route path="category/edit/:id" element={<LibrarianRoute element={<EditCategory />} />} />

            <Route path="author" element={<LibrarianRoute element={<Author />} />} />
            <Route path="author/add" element={<LibrarianRoute element={<AddAuthor />} />} />
            <Route path="author/edit/:id" element={<LibrarianRoute element={<EditAuthor />} />} />

            <Route path="rent" element={<LibrarianRoute element={<RentComponent />} />} />

            <Route path="membership" element={<LibrarianRoute element={<Membership />} />} />
            <Route path="membership/add" element={<LibrarianRoute element={<AddMembership />} />} />
            <Route path="membership/edit" element={<LibrarianRoute element={<EditMembership />} />} />

          </Route>

          {/* Redirect any unmatched route to home */}
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/paymentResult" element={<PaymentConfirm />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
