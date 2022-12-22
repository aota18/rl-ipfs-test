import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

/* *
 * style : sbt | profile | memory
 */

const Uploader = ({ setImageUrl, imageUrl }) => {
  const [files, setFiles] = useState([]);
  // const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL;

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    maxSize: 500000,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    if (files) {
      files.forEach((file) => {
        const formData = new FormData();
        formData.append("file", file);

        /* Image Upload on S3 */
        // axios({
        //   url: uploadUrl,
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        //   data: formData,
        // })
        //   .then((res) => {
        //     console.log(res.data);
        //   })
        //   .catch((err) => console.log(err.response));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div className="w-48 h-48 border-2  border-gray-300 dark:border-gray-600 border-dashed rounded-full cursor-pointer flex flex-col justify-center items-center">
        <input {...getInputProps()} />
        <img
          src={file.preview}
          alt={file.name}
          className="w-48 h-48 object-cover rounded-full "
        />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div className="w-full text-center" {...getRootProps()}>
      <input {...getInputProps()} />
      {!files.length ? (
        <div className="w-48 h-48 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-full cursor-pointer flex flex-col justify-center items-center">
          <input {...getInputProps()} />
          <span className="mx-auto flex justify-center">
            <FiUploadCloud className="text-3xl text-green-500" />
          </span>

          <em className="text-xs text-gray-400">
            (Only *.jpeg and *.png images will be accepted)
          </em>
        </div>
      ) : (
        thumbs
      )}
    </div>
  );
};

export default Uploader;
