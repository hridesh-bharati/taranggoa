import Swal from 'sweetalert2';

// Custom Colored Toast Configuration
export const showToast = (icon, title) => {
  const isSuccess = icon === 'success';
  const isError = icon === 'error';
  const isWarning = icon === 'warning';

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    background: isSuccess ? '#10b981' : isError ? '#ef4444' : isWarning ? '#f59e0b' : '#3b82f6',
    color: '#ffffff',
    iconColor: '#ffffff',
    customClass: {
      popup: 'colored-toast-popup shadow-lg rounded-4',
      title: 'fw-bold fs-6 text-white'
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  Toast.fire({
    icon,
    title
  });
};