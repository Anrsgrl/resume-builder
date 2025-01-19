import React, { useEffect, useState } from "react";
import useStore from "@/store/store";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
const ImageUpload = () => {
  const { image, setImage } = useStore();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImage(base64String);
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (image !== null) {
      setImagePreview(image);
    }
  }, [image]);

  const deleteImage = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 relative">
        {imagePreview && image ? (
          <img
            src={imagePreview}
            alt="Preview"
            loading="lazy"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
            <span className="select-none text-gray-900">
              200x200
            </span>
          </div>
        )}
        {(image && imagePreview) !== null && (
          <button
            onClick={() => deleteImage()}
            type="button"
            className="absolute top-0 right-0 bg-red-400 text-white rounded-full p-1"
          >
            <MdDelete />
          </button>
        )}
      </div>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full cursor-pointer"
        >
          <div className="flex gap-1 my-2">
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
    </div>
  );
};

export default ImageUpload;
