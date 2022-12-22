import { Cloudinary, Transformation } from '@cloudinary/url-gen';
// Import required actions.
import { fit, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { source } from '@cloudinary/url-gen/actions/overlay';

// Import required qualifiers.
import { Position } from '@cloudinary/url-gen/qualifiers/position';
// Import required values.
import { text } from '@cloudinary/url-gen/qualifiers/source';
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';
import useEnsResolver from './useEnsResolver';
import { byAngle } from '@cloudinary/transformation-builder-sdk/actions/rotate';
import { textWrap } from '../utils/string';

const useImgGenerator = () => {
  // Create and configure your Cloudinary instance.

  const CLOUDINARY_CLOUD_NAME = 'dq9sgf5b3';

  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CLOUD_NAME,
    },
  });

  const { getENSFromAddress } = useEnsResolver();

  const resolveAddress = async (address) => {
    const resolvedAddress = await getENSFromAddress(address);

    return resolvedAddress ? resolvedAddress : address;
  };

  const getImage = async (cardInfo, from) => {
    // Use the image with public ID, 'front_face'.
    const myImage = cld.image(cardInfo.selectedCard.publicId);

    let fromAddress = await resolveAddress(from);
    let toAddress = await resolveAddress(cardInfo.recipientAddress);

    let fromPosition;
    let toPosition;

    if (toAddress.startsWith('0x')) {
      toPosition = new Position().offsetX(-100).offsetY(94);
    } else {
      toPosition = new Position().offsetX(-208).offsetY(94);
    }

    if (fromAddress.startsWith('0x')) {
      fromPosition = new Position().offsetX(-80).offsetY(224);
    } else {
      fromPosition = new Position().offsetX(-200).offsetY(224);
    }
    // Apply the transformation.
    myImage
      .resize(thumbnail().width(800).height(600)) // Crop the image.
      .roundCorners(byRadius(20)) // Round the corners.
      .overlay(
        // Overlay the Cloudinary logo.

        // offsetX
        // resolved : -208
        // address : -104
        source(
          text(
            toAddress,
            new TextStyle('arial', 14).textAlignment('left'),
          ).textColor(cardInfo.selectedCard.color.fromTo),
        ).position(toPosition), // Position the logo.
      )
      .overlay(
        // Overlay the Cloudinary logo.

        source(
          text(
            textWrap(cardInfo.description, 50),
            new TextStyle('arial', 18).textAlignment('center'),
          ).textColor(cardInfo.selectedCard.color.description),
        ).position(new Position().offsetX(-20).offsetY(160)), // Position the logo.
      )
      .overlay(
        // Overlay the Cloudinary logo.

        source(
          text(
            fromAddress,
            new TextStyle('arial', 14).textAlignment('center').lineSpacing(8),
          ).textColor(cardInfo.selectedCard.color.fromTo),
        ).position(fromPosition), // Position the logo.
      )

      .format('png'); // Deliver as PNG. */

    return myImage;
  };

  return { getImage };
};

export default useImgGenerator;
