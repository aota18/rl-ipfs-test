import { Button } from '@windmill/react-ui';
import React, { useRef, useState, useEffect } from 'react';
import useQuery from '../../hooks/useQuery';
import { notifySuccess } from '../../utils/toast';
import { useNetwork } from 'wagmi';
import chainData from '../../data/chain.json';

const Confirmation = () => {
  const { chain } = useNetwork();

  const ref = useRef(null);

  const [cardMessage, setCardMessage] = useState('');
  const [copyValue, setCopyValue] = useState('');

  const query = useQuery();

  const copyMessage = async () => {
    // Select the text field
    ref.current.select();
    ref.current.setSelectionRange(0, 99999);

    await navigator.clipboard.writeText(ref.current.value);

    notifySuccess('Message Copied into Clipboard!');
  };

  const generateCardMessage = async (templateId, blockId, from) => {
    if (!chain) return;

    const shortUrl = query.get('shortURL');

    const companyWebsite = `https://${window.location.hostname}`;

    if (templateId === 0) {
      setCardMessage(
        <div>
          Greetings from the Ethereum Block {blockId}! Check out my festival
          @Redlettereth greeting card at{' '}
          <a href={shortUrl} className="underline text-blue-500">
            here
          </a>
          .
          <br />
          <br />
          Blockchain Record:{' '}
          <a
            className="underline text-blue-500"
            href={`${chainData[chain.id].explorer}/tx/${query.get('tx')}`}
          >
            Link
          </a>
          <br />
          <br />
          <br />
          For more information, check Redletter's official website{' '}
          <a className="underline text-blue-500" href={companyWebsite}>
            {companyWebsite}
          </a>
        </div>,
      );

      setCopyValue(
        `Greetings from the Ethereum Block ${blockId}! Check out my festival @Redlettereth greeting card at ${shortUrl}.\n\nBlockchain Record: ${
          chainData[chain.id].explorer
        }/tx/${query.get(
          'tx',
        )}\n\nFor more information, check Redletter's official website ${companyWebsite}`,
      );
    } else {
      setCardMessage(
        <div>
          Greetings from the Ethereum Block {blockId}! Check out my festival
          @Redlettereth greeting card at{' '}
          <a href={shortUrl} className="underline text-blue-500">
            here
          </a>
          <br />
          <br />
          Blockchain Record :{' '}
          <a
            className="underline text-blue-500"
            href={`${chainData[chain.id].explorer}/tx/${query.get('tx')}`}
          >
            Link
          </a>
          <br />
          <br />
          <br />
          For more information, check Redletter's official website{' '}
          <a href={companyWebsite} className="underline text-blue-500">
            {companyWebsite}
          </a>
        </div>,
      );

      setCopyValue(
        `Greetings from the Ethereum Block ${blockId}! Check out my festival @Redlettereth greeting card at ${shortUrl}.\n\nBlockchain Record: ${
          chainData[chain.id].explorer
        }/tx/${query.get('tx')}
        \n\nFor more information, check Redletter's official website ${companyWebsite}`,
      );
    }
  };

  useEffect(() => {
    generateCardMessage(
      query.get('cardId'),
      query.get('block'),
      query.get('recipientAddress'),
    );
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-col space-y-8">
        <div className="">
          <img src={`/img/step3-${query.get('step')}.svg`} alt="step" />
        </div>

        <div className="text-4xl font-bold tracking-tight">
          Your Redletter was sent!
        </div>

        <div>
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-black text-2xl font-bold mb-1">Share Card</h2>
            <div className="flex flex-col border py-6 px-4 rounded-md flex-auto max-w-md">
              {cardMessage}
            </div>

            {/** TODO: TextCopy */}
            <textarea ref={ref} id="msgToShare" value={copyValue} hidden />
            <Button
              className="w-full sm:w-auto "
              layout="primary"
              onClick={() => copyMessage()}
            >
              Copy Message
            </Button>
          </div>
        </div>

        {/* <div className="grid grid-cols-8 gap-2">
          <div className="col-span-8">
            <div className="text-lg mb-4 font-light text-gray-600">
              Share your Redletter with the community
            </div>
          </div>
          <div className="col-span-8">
            <LabelArea label="Receipient Twitter Handle (optional)" />
          </div>

          <div className="col-span-1 flex justify-center items-center">
            <img src="/twitter.svg" alt="twitter" />
          </div>

          <div className="col-span-7">
            <InputArea
              register={register}
              name="twitterHandle"
              required={false}
              type="text"
              placeholder="Twitter Handle"
            />
          </div>

          <div className="col-span-8">
            <Button onClick={onClickShare} className="mt-4 h-12 w-full" block>
              Share
            </Button>
          </div>

          <div className="col-span-8 mt-8">
            <div className="text-lg mb-4 font-light text-gray-600">
              Send an email to let your recipient know
            </div>
          </div>
          <div className="col-span-8">
            <LabelArea label="Recipient Email" />
          </div>

          <div className="col-span-8">
            <InputArea
              register={register}
              name="emailAddress"
              required={false}
              type="text"
              placeholder="Email Address"
            />
          </div>

          <div className="col-span-8">
            <Button
              onClick={() => console.log("Email share")}
              className="mt-4 h-12 w-full"
              block
            >
              Send Email
            </Button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Confirmation;
