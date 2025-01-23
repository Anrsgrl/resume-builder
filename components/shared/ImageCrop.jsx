import { useState } from "react";
import Cropper from "react-easy-crop";
import Modal from "@/components/shared/Modal";
import Button from "@/components/common/Button";
import { MdCancel } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
const ImageCrop = ({ open, image, onCropDone, onCropCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <Modal isOpen={open}>
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={1 / 1}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
      <div className="p-2 text-main flex items-center justify-center gap-1 absolute left-0 bottom-2 w-full">
        <Button
          type="button"
          onClick={() => onCropCancel()}
          className={`aspect-square text-white bg-red-400 border-red-400 hover:bg-red-400/70`}
        >
          <MdCancel size={24} />
        </Button>
        <Button
          type="button"
          onClick={() => onCropDone(croppedArea)}
          className={`aspect-square text-white bg-main border-main hover:bg-main/70`}
        >
          <IoCheckmarkDoneCircleSharp size={24} />
        </Button>
      </div>
    </Modal>
  );
};

export default ImageCrop;
