import toast from 'cogo-toast';

const option = {
  hideAfter: 1.5
};

export const showSuccessNotif = (message) => toast.success(message, option);

export const showLoadingNotif = (message) => toast.loading(message, option);

export const showErrorNotif = (message) => toast.error(message, option);

export const withNotification = (successMsg, errorMsg, loadingMsg) => (promise) => {
  const loadingNotif = showLoadingNotif(loadingMsg);
  const successNotif = (args) => {
    loadingNotif.then(() => showSuccessNotif(successMsg));
    return args;
  }
  const errorNotif = (err) => {
    loadingNotif.then(() => showErrorNotif(errorMsg));
    throw err;
  }
  return promise.then(successNotif).catch(errorNotif);
}
