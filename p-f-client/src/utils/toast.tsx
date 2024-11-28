import { ToastType } from '@/types/toast';
import { toast } from 'react-toastify';

const DEFAULT_TOAST_SETTINGS = {
  position: 'top-right' as const,
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored' as const,
  className: 'rounded-lg bg-green-500 height-[50px] w-[150px]', 
};

const Body = ({ message }: { message: string }) => {
  return (
    <div className="bg-slate-700">
      <p>{message}</p>
    </div>
  );
};

interface IShowToast {
  message: string;
  type: ToastType;
}

export const showTost = (type: ToastType, message: string) => {
  toast[type](<Body message={message} />, DEFAULT_TOAST_SETTINGS);
};
