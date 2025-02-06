import Image from "next/image";

type ContinueWithGoogleButtonType = {
  onHandleGoogle: () => void;
};
const ContinueWithGoogleButton = ({
  onHandleGoogle,
}: ContinueWithGoogleButtonType) => {
  return (
    <div
      className="flex items-center border-solid border-[1px] border-slate-200 rounded-sm p-3 mt-3 cursor-pointer"
      onClick={() => onHandleGoogle()}
    >
      <Image src="/google_img.png" width={20} height={20} alt="google" />
      <span className="ml-2 text-dimgrey">Continue with Google</span>
    </div>
  );
};

export default ContinueWithGoogleButton;
