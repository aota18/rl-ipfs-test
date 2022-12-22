import React, { useEffect, useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Transformation } from "@cloudinary/url-gen";

// Import required actions.
import { thumbnail, scale } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { sepia } from "@cloudinary/url-gen/actions/effect";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { opacity, brightness } from "@cloudinary/url-gen/actions/adjust";
import { byAngle } from "@cloudinary/url-gen/actions/rotate";

// Import required qualifiers.
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
// Import required values.
import { text } from "@cloudinary/url-gen/qualifiers/source";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
import { Button } from "@windmill/react-ui";
import { imgToFile } from "../utils/file";
import S3FileUpload from "react-s3/lib/ReactS3";

const Test = () => {
  // Create and configure your Cloudinary instance.

  const config = {
    bucketName: "redletter-storage",
    region: "us-east-2",
    accessKeyId: "AKIAVOKR6KRVSJYJV74K",
    secretAccessKey: "HiAc0xC8HTFkniItkZ",
  };

  const s3FileUpload = (url) => {
    const fileName = "greeting/abcd";

    try {
      fetch(url, {
        mode: "no-cors",
      }).then(async (response) => {
        console.log(response);
        const contentType = response.headers.get("content-type");
        const blob = await response.blob();
        const file = new File([blob], fileName, { contentType });

        console.log(file);

        S3FileUpload.uploadFile(file, config)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Render the transformed image in a React component.
  return (
    <div>
      <Button
        onClick={() =>
          s3FileUpload(
            "https://res.cloudinary.com/dq9sgf5b3/image/upload/v1671256712/card2_apnkry_rea1av.png"
          )
        }
      >
        Image to file
      </Button>

      <img src="https://redletter-storage.s3.us-west-2.amazonaws.com/greetings/asdf" />
    </div>
  );
};

export default Test;

//
