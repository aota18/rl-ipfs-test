import { useStateMachine } from 'little-state-machine';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useQuery from '../../hooks/useQuery';
import { Button } from '@windmill/react-ui';
import HeaderNavigator from '../../components/header-navigator/HeaderNavigator';
import PageTitle from '../../components/page-title/PageTitle';
import useImgGenerator from '../../hooks/useImgGenerator';
import { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { notifyError, notifySuccess } from '../../utils/toast';
import useContract from '../../hooks/useContract';
import GREETING_CARD from '../../contracts/GreetingCard.json';
import useTokenURI from '../../hooks/useTokenURI';
import GreetingServices from '../../services/GreetingServices';
import {
  updateCardDetails,
  clearCardDetails,
} from '../../actions/updateCardDetails';
import blockchain from '../../data/data.json';
import { useNetwork } from 'wagmi';

const Preview = () => {
  const { chain } = useNetwork();

  const {
    state: { user },
  } = useContext(AdminContext);
  const { state, actions } = useStateMachine({
    updateCardDetails,
    clearCardDetails,
  });

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState('');

  const { getImage } = useImgGenerator();

  const { handleSubmit } = useForm({
    defaultValues: state.cardInfo,
  });

  const query = useQuery();
  const navigate = useNavigate();

  const onPressBack = () => {
    navigate('/greeting-card', { replace: true });
  };

  const onSubmit = async (data) => {
    const result = await mintGreetingCard();

    navigate(
      `/greeting-card/confirmation?step=3&tx=${result.transactionId}&block=${result.blockNumber}&imgUrl=${result.imgUrl}&cardId=${state.cardInfo.selectedCard.id}&recipient=${state.cardInfo.recipientAddress}&shortURL=${result.shortUrl}`,
      {
        replace: true,
      },
    );

    actions.clearCardDetails();
  };

  const { getContract } = useContract();
  const { getTokenURI } = useTokenURI();

  const mintFreeGreetingCard = async () => {
    let contractAddress = blockchain.contracts.greetingCard.mumbai;

    if (!chain || chain.network !== 'mumbai') {
      notifyError('Check your network! ');
    } else {
      try {
      } catch (err) {
        setLoading(true);
        const contract = await getContract(contractAddress, GREETING_CARD.abi);
        if (!contract) {
          throw new Error('Ooops! contract was not imported!');
        }

        const image = await getImage(state.cardInfo, user.address);

        if (!image) {
          throw new Error('Cannot get Image!');
        }

        const tokenURI = await getTokenURI(
          {
            name: 'RedLetter Greeting Card',
            description: state.cardInfo.description,
            image: image.toURL(),
          },
          'rl/gc',
        );

        if (!tokenURI) {
          throw new Error('Cannot get Token URI!');
        }

        const mintTxn = await contract.safeMint(
          state.cardInfo.recipientAddress,
          tokenURI,
        );

        const receipt = await mintTxn.wait();

        const transactionId = receipt.transactionHash;
        const blockNumber = receipt.blockNumber;

        const result = await GreetingServices.createGreeting({
          from: user.address,
          to: state.cardInfo.recipientAddress,
          description: state.cardInfo.description,
          transactionId,
          imgUrl: image.toURL(),
        });

        if (result.status !== 200) {
          throw new Error(result.message);
        }

        setLoading(false);

        notifySuccess(result.message);

        result.data.blockNumber = blockNumber;

        return result.data;
      }
    }
  };

  const mintGreetingCard = async () => {
    let contractAddress;

    if (!chain) {
      notifyError('Check your network!');
    } else {
      if (chain.network === 'goerli') {
        contractAddress = blockchain.contracts.greetingCard.goerli;
      } else {
        contractAddress = blockchain.contracts.greetingCard.ethereum;
      }

      try {
        setLoading(true);
        const contract = await getContract(contractAddress, GREETING_CARD.abi);
        if (!contract) {
          throw new Error('Ooops! contract was not imported!');
        }

        const image = await getImage(state.cardInfo, user.address);

        if (!image) {
          throw new Error('Cannot get Image!');
        }

        const tokenURI = await getTokenURI(
          {
            name: 'RedLetter Greeting Card',
            description: state.cardInfo.description,
            image: image.toURL(),
          },
          'rl/gc',
        );

        if (!tokenURI) {
          throw new Error('Cannot get Token URI!');
        }

        const mintTxn = await contract.safeMint(
          state.cardInfo.recipientAddress,
          tokenURI,
        );

        const receipt = await mintTxn.wait();

        const transactionId = receipt.transactionHash;
        const blockNumber = receipt.blockNumber;

        const result = await GreetingServices.createGreeting({
          from: user.address,
          to: state.cardInfo.recipientAddress,
          description: state.cardInfo.description,
          transactionId,
          imgUrl: image.toURL(),
        });

        if (result.status !== 200) {
          throw new Error(result.message);
        }

        setLoading(false);

        notifySuccess(result.message);

        result.data.blockNumber = blockNumber;

        return result.data;
      } catch (err) {
        notifyError('Check if recipient address is valid!');
        setLoading(false);
        return;
      }
    }
  };

  useEffect(async () => {
    const image = await getImage(state.cardInfo, user.address);

    setImage(image);
  }, []);

  return (
    <div className="p-4 truncate">
      <HeaderNavigator back onPressBack={onPressBack} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <PageTitle text={'Preview'} />

        <div>
          <img src={`/img/step3-${query.get('step')}.svg`} alt="step" />
        </div>

        <span className=" text-gray-500 ">
          Confirm below to send your Redletter!
        </span>

        <div className="space-y-2">
          <h3 className="font-bold">Card Details</h3>

          <div className="flex space-x-4 items-center">
            <div
              style={{
                backgroundImage: `url(${state.cardInfo.selectedCard.url})`,
              }}
              className={`flex-none w-20 h-20 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer flex flex-col justify-end items-center space-y-1 p-1 bg-cover`}
            ></div>

            <div className="flex-auto text-gray-500 text-sm">
              {state.cardInfo.description}
            </div>
          </div>
        </div>

        {image && <img src={image.toURL()} alt="hh" />}

        <div
          className="space-y-2 truncate
      "
        >
          <h3 className="font-bold">Recipient Address</h3>
          <div className="truncate">{state.cardInfo.recipientAddress}</div>
        </div>

        {/* <Button
          type="button"
          layout="primary"
          className="w-full"
          onClick={() => mintFreeGreetingCard()}
          disabled={loading}
        >
          {loading ? 'Wait...' : 'Confirm (Free Minting)'}
        </Button> */}

        <Button
          type="submit"
          layout="primary"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Wait...' : 'Confirm'}
        </Button>
      </form>
    </div>
  );
};

export default Preview;
