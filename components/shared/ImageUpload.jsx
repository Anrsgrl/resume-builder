import React, { useEffect, useState } from "react";
import useStore from "@/store/store";
import { IoCloudDoneSharp, IoCloudUploadOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import ImageCrop from "@/components/shared/ImageCrop";
import { useTranslations } from "next-intl";
const ImageUpload = () => {
  const {
    store: { image },
    setStore,
  } = useStore();
  const t = useTranslations("Personal");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageAfterCrop, setImageAfterCrop] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file && imageAfterCrop === "") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
      setModalOpen(true);
    }
  };

  useEffect(() => {
    if (image !== null) {
      setImagePreview(image);
    }
  }, [image]);

  const deleteImage = () => {
    if (window.confirm(t("remove"))) {
      setStore("image", null);
      setImagePreview(null);
      setImageAfterCrop("");
    }
  };

  const onCropDone = (imgCroppedArea) => {
    const canvasElement = document.createElement("canvas");
    canvasElement.width = imgCroppedArea.width;
    canvasElement.height = imgCroppedArea.height;

    const context = canvasElement.getContext("2d");

    let imageObject1 = new Image();
    imageObject1.src = imagePreview;
    imageObject1.onload = function () {
      context.drawImage(
        imageObject1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );

      const dataURL = canvasElement.toDataURL("image/jpeg");
      setImageAfterCrop(dataURL);
    };
    setImagePreview(null);
    setModalOpen(false);
  };

  const uploadToStore = () => {
    if (imageAfterCrop === "") return;
    setStore("image", imageAfterCrop);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 relative">
        {(imageAfterCrop && !image) || (imageAfterCrop && image) ? (
          <img
            src={imageAfterCrop}
            alt="imageAfterCrop"
            loading="lazy"
            className="w-full h-full object-cover rounded-full"
          />
        ) : image ? (
          <img
            src={image}
            alt="image"
            loading="lazy"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
            <span className="select-none text-gray-900 text-xs">80 x 80</span>
          </div>
        )}
        {image !== null && (
          <button
            onClick={() => deleteImage()}
            type="button"
            className="absolute top-0 right-0 bg-red-400 text-white rounded-full p-1"
          >
            <MdDelete />
          </button>
        )}
      </div>
      <div className="flex items-center justify-center">
        <ImageCrop
          image={imagePreview}
          open={modalOpen}
          onCropCancel={() => setModalOpen(false)}
          onCropDone={onCropDone}
        />
      </div>
      <div className="flex items-center justify-center gap-2 my-2">
        <div className="flex items-center gap-1 justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full cursor-pointer"
          >
            <div className="flex gap-1">
              <IoCloudUploadOutline size={20} className="text-white" />
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        {imageAfterCrop !== "" && !image && (
          <button type="button" onClick={uploadToStore} className="flex gap-1">
            <IoCloudDoneSharp size={20} className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
