import { useStateMachine } from 'little-state-machine';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useQuery from '../../hooks/useQuery';
import HeaderNavigator from '../header-navigator/HeaderNavigator';
import PageTitle from '../page-title/PageTitle';
import { updateEvents, clearEvents } from './updateAction.js';
import { mock } from '../../utils/mock';
import { truncateString } from '../../utils/string';
import { AiFillEnvironment } from 'react-icons/ai';
import { Button } from '@windmill/react-ui';
import { ContractFactory, ethers } from 'ethers';
import EventServices from '../../services/EventServices';
import { notifyError, notifySuccess } from '../../utils/toast';
import TicketBooth from '../../contracts/TicketBoot.json';

const makeEventObject = (obj) => {
  let eventObj = {};
  eventObj.eventStartDt =
    moment(obj.eventStartDate).unix() + obj.eventStartTime;
  eventObj.eventEndDt = moment(obj.eventEndDate).unix() + obj.eventEndTime;
  eventObj.salesStartDt =
    moment(obj.salesStartDate).unix() + obj.salesStartTime;
  eventObj.salesEndDt = moment(obj.salesEndDate).unix() + obj.eventEndTime;
  eventObj.airdropDt = moment(obj.airdropDate).unix() + obj.airdropTime;

  eventObj.category = obj.category;
  eventObj.eventTitle = obj.eventTitle;
  eventObj.eventAddress1 = obj.eventAddress1;
  eventObj.eventAddress2 = obj.eventAddress2;
  eventObj.description = obj.description;
  eventObj.onOffline = obj.onOffline;
  eventObj.privacy = obj.privacy;
  eventObj.repeat = obj.repeat;

  eventObj.ticketName = obj.ticketName;
  eventObj.ticketType = obj.ticketType;
  eventObj.ticketPrice = obj.ticketPrice;
  eventObj.ticketQuantity = obj.ticketQuantity;

  /* Delete preview key*/

  let eventImgFilesArr = deleteKeysFromObject(obj.eventImgFiles, 'preview');
  let memoriesImgFilesArr = deleteKeysFromObject(
    obj.memoriesImgFiles,
    'preview',
  );
  let sbtImgFilesArr = deleteKeysFromObject(obj.sbtImgFiles, 'preview');
  let ticketImgFilesArr = deleteKeysFromObject(obj.ticketImgFiles, 'preview');

  if ('password' in obj) {
    eventObj.password = obj.password;
  }

  if ('price' in obj) {
    eventObj.price = obj.price;
  }

  eventObj.sbtName = obj.sbtName;

  let formObj = new FormData();

  Object.keys(eventObj).forEach((key, idx) => {
    formObj.append(key, eventObj[key]);
  });

  eventImgFilesArr.forEach((file) => formObj.append('eventImgFiles', file));
  memoriesImgFilesArr.forEach((file) =>
    formObj.append('memoriesImgFiles', file),
  );
  sbtImgFilesArr.forEach((file) => formObj.append('sbtImgFiles', file));
  ticketImgFilesArr.forEach((file) => formObj.append('ticketImgFiles', file));

  return formObj;
};

const deleteKeysFromObject = (objArr, key) => {
  objArr.forEach((obj) => delete obj[key]);
  return objArr;
};

// Make Date Time
// Include category

const Preview = () => {
  const { actions, state } = useStateMachine({ updateEvents, clearEvents });
  const { handleSubmit } = useForm({
    defaultValues: state.event,
  });

  const query = useQuery();
  const navigate = useNavigate();

  const onPressBack = () => {
    navigate('/create-event/sbt-details?step=4', { replace: true });
  };

  const onSubmit = async (data) => {
    const eventData = state.event;
    const eventCreateDto = makeEventObject(eventData);
    // for (const key of eventCreateDto.keys()) {
    //   console.log(key + ": " + eventCreateDto.get(key));
    // }
    try {
      /* Set Ticket type by Paid Option */
      /* PAID - Ticket Price
         FREE - 0
      */
      const ticketPrice =
        eventData.ticketType === 'PAID'
          ? parseFloat(eventCreateDto.get('ticketPrice')) * 10 ** 18
          : 0;
      const ticketContractAddress = await deployTicketBooth(
        eventCreateDto.get('ticketQuantity'),
        ticketPrice,
      );
      if (!ticketContractAddress)
        throw new Error('Error with Deploying Contract Address');
      eventCreateDto.append('ticketContractAddress', ticketContractAddress);

      await EventServices.createEvent(eventCreateDto);

      notifySuccess('Event Successfully created!');
      /* Clear Event Form */
      actions.clearEvents();
      /* Move to */
      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
      notifyError(err.message);
    }
  };

  const deployTicketBooth = async (numOfTickets, ticketPrice) => {
    try {
      const { ethereum } = window;

      if (!ethereum) return;

      const provider = new ethers.providers.Web3Provider(ethereum);

      const signer = provider.getSigner();

      const factory = new ContractFactory(
        TicketBooth.abi,
        TicketBooth.bytecode,
        signer,
      );

      const contract = await factory.deploy(numOfTickets, ticketPrice);

      return contract.address;
    } catch (err) {
      console.log(err);
    }
  };

  const generatePreviewURL = (file) => {
    const newObject = { ...file };
    return Object.assign(newObject, { preview: URL.createObjectURL(file) });
  };

  const renderEventImage = () => {
    const file = generatePreviewURL(state.event.eventImgFiles[0]);

    return (
      <img
        style={{ width: '100px', height: '136px' }}
        className="object-cover rounded-lg"
        src={file.preview}
        alt="event"
      />
    );
  };

  const renderSBTImage = () => {
    const file = generatePreviewURL(state.event.sbtImgFiles[0]);

    return (
      <img src={file.preview} className="rounded-full w-20 h-20" alt="sbt" />
    );
  };

  return (
    <div className="p-4">
      <HeaderNavigator back onPressBack={onPressBack} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <PageTitle text={'Preview'} />

        <div>
          <img src={`/step5-${query.get('step')}.svg`} alt="step" />
        </div>

        <span className=" text-gray-500 ">
          Confirm below to launch your event!
        </span>

        <div className="space-y-2">
          <h3 className="font-bold">Event & Ticket</h3>

          <div className="flex justify-between font-sf space-x-4 ">
            {state.event?.eventImgFiles && renderEventImage()}

            <div className="flex flex-col space-y-4 justify-center w-full">
              <div className="flex flex-col space-y-1">
                <span className="text-gray-500 text-sm font-thin ">
                  {moment
                    .unix(state.event?.eventStartDate)
                    .format('ddd, MMM D')}
                </span>
                <span className="">{state.event?.eventTitle}</span>
                <span className="flex items-center text-gray-500 text-sm space-x-2 font-thin">
                  <AiFillEnvironment className="w-3 h-3" />
                  <span>{truncateString(state.event?.eventAddress1, 20)}</span>
                </span>
              </div>

              <div className="flex justify-between">
                <span>
                  {state.event?.ticketPrice
                    ? `${state.event?.ticketPrice} ETH`
                    : 'FREE'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-bold">SBT</h3>
          <div className="flex space-x-2 items-center">
            {state.event?.sbtImgFiles && renderSBTImage()}

            <div className="flex flex-col">
              <span className="">{state.event?.sbtName}</span>
              <span className="text-sm text-gray-500">
                Airdrop on{' '}
                {moment(state.event?.airdropDate).format('MMM DD, YYYY')}
              </span>
            </div>
          </div>
        </div>

        <Button type="submit" layout="primary" className="w-full">
          Confirm
        </Button>
      </form>
    </div>
  );
};

export default Preview;
