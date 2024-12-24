import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type CustomToastProps = {
  message: string;
}

export function CustomToast({ message }: CustomToastProps) {
  return (
    <div style={{ fontSize: '14px', padding: '8px' }}>
      {message}
    </div>
  );
}

export function CustomToastContainer() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}

export const showCustomToast = (message: string) => {
  toast(<CustomToast message={message} />);
};
