import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';

// add a <div> child to body under which to mount the snackbars
const mountPoint = document.createElement('div');
document.body.appendChild(mountPoint);

export default {
  success: function(msg) {
    this.toast(msg, 'success');
  },
  warning: function(msg) {
    this.toast(msg, 'warning');
  },
  info: function(msg) {
    this.toast(msg, 'info');
  },
  error: function(msg) {
    this.toast(msg, 'error');
  },
  toast: function(msg, variant = 'default') {
    const ShowSnackbar = ({ message }) => {
      const { enqueueSnackbar } = useSnackbar();
      enqueueSnackbar(message, { variant });
      return null;
    };
    ReactDOM.render(
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        autoHideDuration={2000}
        preventDuplicate={true}
      >
        <ShowSnackbar message={msg} variant={variant} />
      </SnackbarProvider>,
      mountPoint
    );
  }
};
