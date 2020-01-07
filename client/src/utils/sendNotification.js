import toast from 'cogo-toast';

const option = {
  hideAfter: 1,
};

export const showSuccessNotif = (message) => toast.success(message, option);

export const showLoadingNotif = (message) => toast.loading(message, option);

export const showErrorNotif = (message) => toast.error(message, option);

export default ({ success, failure, loading }) => (promise) => {
  const loadingNotif = showLoadingNotif(loading);
  const successNotif = (args) => {
    loadingNotif.then(() => showSuccessNotif(success));
    return args;
  };
  const errorNotif = (err) => {
    loadingNotif.then(() => showErrorNotif(failure));
    throw err;
  };
  return promise.then(successNotif).catch(errorNotif);
};
