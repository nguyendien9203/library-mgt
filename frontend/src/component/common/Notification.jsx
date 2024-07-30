import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
  return <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />;
};

export const successNotification = (description) => {
  toast.success(`${description}`);
};

export const errorNotification = (description) => {
  toast.error(`${description}`);
};

export const infoNotification = (description) => {
  toast.info(`${description}`);
};

export const warningNotification = (description) => {
  toast.warn(`${description}`);
}

export default Notification;
