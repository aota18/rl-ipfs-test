import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineModeEditOutline, MdOutlineAdd } from "react-icons/md";
import { mock } from "../../utils/mock";
import { notifyError } from "../../utils/toast";

const ProfileImgUploader = ({
  img,
  isNew,
  onChange,
  defaultValue,
  isGuest,
}) => {
  const [file, setFile] = useState(defaultValue ? defaultValue : null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    max_size: 500_000,

    onDropAccepted: (acceptedFiles) => {
      setFile((file) => {
        file = acceptedFiles[0];

        Object.assign(file, { preview: URL.createObjectURL(file) });

        return file;
      });

      onChange(acceptedFiles[0]);
    },
    onDropRejected: (file) => {
      const { errors } = file[0];
      notifyError(errors[0].message);
    },
  });

  return (
    <div className="relative w-20 h-20 cursor-pointer" {...getRootProps()}>
      <input {...getInputProps()} hidden />
      <img
        src={file ? file.preview : img ? img : mock.profileImg}
        className="rounded-full bg-cover w-20 h-20"
        alt="profile"
      />
      {!isGuest && (
        <div className="absolute bottom-0 right-0 z-10 bg-black w-6 h-6 text-white rounded-full flex justify-center items-center">
          {isNew ? (
            <MdOutlineAdd className="text-lg" />
          ) : (
            <MdOutlineModeEditOutline />
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileImgUploader;
