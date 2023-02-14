import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsFillCameraFill, BsX } from 'react-icons/bs';
import { notifyError } from '../../utils/toast';

/* *
 * style : sbt | profile | memory
 */

const UploaderForm = ({ maxNum, onChange, value, defaultValues }) => {
  const [files, setFiles] = useState(defaultValues ? defaultValues : []);
  // const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL;

  // 500KB
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    maxSize: 500_000,

    onDropAccepted: (acceptedFiles) => {
      setFiles((files) => [...files, acceptedFiles[0]]);
      onChange([...files, acceptedFiles[0]]);
    },
    onDropRejected: (file) => {
      const { errors } = file[0];
      notifyError(errors[0].message);
    },
  });

  const onClickRemoveFile = (file) => {
    setFiles((files) => files.filter((f) => f.name !== file.name));
  };

  const thumbs = files.map((file, idx) => {
    /* Recreate Object URL for files */

    console.log(file);
    const newObject = { ...file };

    if (file) {
      Object.assign(newObject, { preview: URL.createObjectURL(file) });
    }

    return (
      <div key={idx}>
        <div className="w-20 h-20 border-2  border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer relative">
          <input {...getInputProps()} hidden />
          <img
            src={newObject.preview}
            alt={newObject.name}
            className="w-20 h-20 object-cover rounded-md "
          />
          <div
            className="w-5 h-5 flex justify-center items-center bg-danger rounded-full top-1 right-1 absolute cursor-pointer"
            onClick={() => onClickRemoveFile(file)}
          >
            <BsX className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="w-full text-center">
      {!files.length ? (
        <div
          className="w-20 h-20 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer flex flex-col justify-center items-center space-y-1"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <span className="mx-auto flex justify-center">
            <BsFillCameraFill className="text-lg" />
          </span>

          <span className="text-xs text-gray-400">Add Image</span>
        </div>
      ) : (
        <div className="flex space-x-2">
          {thumbs}

          {files.length < maxNum && (
            <div
              className="w-20 h-20 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer flex flex-col justify-center items-center space-y-1"
              {...getRootProps()}
            >
              <span className="mx-auto flex justify-center">
                <BsFillCameraFill className="text-lg" />
              </span>

              <span className="text-xs text-gray-400">Add Image</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploaderForm;
