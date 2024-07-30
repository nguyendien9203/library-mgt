import { successNotification, errorNotification, infoNotification, warningNotification } from '../component/common/Notification';

const useNotification = () => {
  const showSuccess = (description) => {
    successNotification(description);
  };

  const showError = (description) => {
    errorNotification(description);
  };

  const showInfo = (description) => {
    infoNotification(description);
  };

  const showWarning = (description) => {
    warningNotification(description);
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning
  };
};

export default useNotification;
