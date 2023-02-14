import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
import { updateEvents } from './updateAction';
import LabelArea from '../form/LabelArea';
import InputArea from '../form/InputArea';
import Error from '../form/Error';
import { useState, useContext, useRef } from 'react';
import HeaderNavigator from '../header-navigator/HeaderNavigator';
import PageTitle from '../page-title/PageTitle';

import DatePicker from '../form/DatePicker';

import { Button, Label, Input } from '@windmill/react-ui';
import useQuery from '../../hooks/useQuery';
import TimePicker from '../form/TimePicker';
import useGifEncoder from '../../hooks/useGifEncoder';
import { AdminContext } from '../../context/AdminContext';
import SectionDividerDrop from '../section-divider/SectionDividerDrop';
import Papa from 'papaparse';
import { getExtension } from '../../utils/file';
import { notifyError } from '../../utils/toast';
import { AiOutlineClose } from 'react-icons/ai';

const TicketNFTDetails = () => {
  let query = useQuery();

  const whiteListinputRef = useRef(null);
  const blackListinputRef = useRef(null);

  const {
    state: { user },
  } = useContext(AdminContext);

  const [isGIFCreated, setGIFCreated] = useState(false);
  const [whiteListFile, setWhiteListFile] = useState();
  const [blackListFile, setBlackListFile] = useState();
  const [whiteList, setWhiteList] = useState([]);
  const [blackList, setBlackList] = useState([]);

  const { actions, state } = useStateMachine({ updateEvents });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    getValues,
    resetField,
  } = useForm({
    defaultValues: state.event,
  });

  const { loading, startRecord } = useGifEncoder(
    {
      creator: `${user.firstName} ${user.lastName}`,
      eventLine2: state.event.eventTitle.substring(0, 9),
      eventLine3: state.event.eventTitle.substring(9, 18),
      numOfTickets: getValues('ticketQuantity') || 0,
      eventStartDate: state.event.eventStartDate,
    },
    setValue,
    setGIFCreated,
  );

  const [infoCollapsed, setInfoCollapsed] = useState({
    whiteList: false,
    blackList: false,
  });

  const [paid, setPaid] = useState(state.event?.ticketType === 'PAID');

  const toggleInfoCollapse = (key) => {
    setInfoCollapsed((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const navigate = useNavigate();

  const onPressBack = () => {
    navigate('/create-event/memories?step=2', { replace: true });
  };

  const onSubmit = (data) => {
    // Create NFT Ticket GIF Rendering and save into File
    actions.updateEvents(data);
    navigate('/create-event/sbt-details?step=4');
  };

  const handleWhiteListUploadClick = () => {
    whiteListinputRef.current?.click();
  };

  const handleBlackListUploadClick = () => {
    blackListinputRef.current?.click();
  };

  const handleFileChangeWhite = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    // Check Extension
    if (getExtension(file.name).toLowerCase() !== 'csv') {
      alert('not csv');
      return;
    }

    handleParse(file, 'white');
    setWhiteListFile(e.target.files[0]);
  };

  const handleFileChangeBlack = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];

    // Check Extension
    if (getExtension(file.name).toLowerCase() !== 'csv') {
      alert('not csv');
      return;
    }

    handleParse(file, 'black');
    setBlackListFile(e.target.files[0]);
  };

  const handleParse = (file, list) => {
    const reader = new FileReader();

    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      const columns = Object.keys(parsedData[0]);

      if (columns.length <= 0) {
        notifyError('Wrong CSV format!');
        return;
      }

      if (list === 'white') {
        setWhiteList(parsedData);
        setValue('whiteList', parsedData);
      } else {
        setBlackList(parsedData);
        setValue('blackList', parsedData);
      }
    };

    reader.readAsText(file);
  };

  const handleRemove = (list, address) => {
    if (list === 'white') {
      const newList = whiteList.filter((item) => item.Address !== address);
      setWhiteList(newList);
      setValue('whiteList', newList);
    } else {
      const newList = blackList.filter((item) => item.Address !== address);
      setBlackList(newList);
      setValue('blackList', newList);
    }
  };

  const handleAddAddress = (list) => {
    if (list === 'white') {
      const newList = [
        ...whiteList,
        { Address: getValues('whiteListAddress') },
      ];

      setWhiteList(newList);
      setValue('whiteList', newList);
      resetField('whiteListAddress');
    } else {
      const newList = [
        ...blackList,
        { Address: getValues('blackListAddress') },
      ];

      setBlackList(newList);
      setValue('blackList', newList);
      resetField('blackListAddress');
    }
  };

  return (
    <div className="p-4">
      <HeaderNavigator back onPressBack={onPressBack} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageTitle text={'Ticket NFT Details'} />

        <div className="my-6">
          <img src={`/step5-${query.get('step')}.svg`} alt="step" />
        </div>

        <div className="grid grid-cols-8 gap-4 my-8">
          <div className="col-span-8 space-y-2">
            <LabelArea label="Ticket Name" />
            <InputArea
              register={register}
              name="ticketName"
              label="Ticket Name"
              type="text"
              placeholder="Ticket Name"
              required={true}
            />

            <Error errorName={errors.ticketName} />
          </div>

          <input
            hidden
            type="file"
            {...register('ticketImgFiles')}
            name="ticketImgFiles"
          />

          {/* <div className="col-span-8 space-y-2">
            <LabelArea label="Ticket NFT Image" />
            <Controller
              control={control}
              name="ticketImgFiles"
              rules={{ required: "At least one image is required!" }}
              render={({ field: { onChange } }) => (
                <UploaderForm
                  maxNum={1}
                  onChange={onChange}
                  defaultValues={state.event?.ticketImgFiles}
                />
              )}
            />
            <Error errorName={errors.ticketImgFile} />
          </div> */}

          <div className="col-span-8 space-y-2">
            <LabelArea label="Ticket Type" />
            <div>
              <Label radio className="grid grid-cols-8 gap-4">
                <div className="col-span-4">
                  <Input
                    type="radio"
                    {...register(`ticketType`)}
                    value="FREE"
                    onClick={() => setPaid(false)}
                    defaultChecked={state.event?.ticketType ? false : true}
                    defaultValue={state.event?.ticketType}
                  />
                  <span className="ml-2">Free</span>
                </div>
                <div className="col-span-4">
                  <Input
                    type="radio"
                    {...register(`ticketType`)}
                    value="PAID"
                    onClick={() => setPaid(true)}
                    defaultValue={state.event?.ticketType}
                  />
                  <span className="ml-2">Paid</span>
                </div>
              </Label>
            </div>
          </div>

          <div className="col-span-8 space-y-2">
            <div>
              <Label radio className="grid grid-cols-8 gap-4">
                <div className="col-span-4 space-y-2">
                  <LabelArea label="Quantity" />
                  <InputArea
                    register={register}
                    name="ticketQuantity"
                    type="number"
                    placeholder="1"
                    label="Ticket Quantity"
                    required={true}
                  />

                  <Error errorName={errors.ticketQuantity} />
                </div>
                <div className="col-span-4 space-y-2">
                  <LabelArea label="Ticket Price" />
                  <div className="flex space-x-2 items-center">
                    <InputArea
                      register={register}
                      name="ticketPrice"
                      type="number"
                      label="Ticket Price"
                      placeholder="0.00"
                      step="any"
                      disabled={!paid}
                      required={paid}
                    />
                    <span>ETH</span>
                  </div>
                  <Error errorName={errors.ticketPrice} />
                </div>
              </Label>
            </div>
          </div>

          <div className="col-span-8 space-y-2">
            <LabelArea label="Can be resold (secondary market)" />
            <div>
              <Label radio className="grid grid-cols-8 gap-4">
                <div className="col-span-4">
                  <Input
                    type="radio"
                    {...register(`canBeResold`)}
                    value="no"
                    defaultChecked={state.event?.canBeResold ? false : true}
                    defaultValue={state.event?.canBeResold}
                  />
                  <span className="ml-2">No</span>
                </div>
                <div className="col-span-4">
                  <Input
                    type="radio"
                    {...register(`canBeResold`)}
                    value="yes"
                    defaultValue={state.event?.canBeResold}
                  />
                  <span className="ml-2">Yes</span>
                </div>
              </Label>
            </div>
          </div>

          <div className="col-span-8 space-y-2">
            <LabelArea label="Sales Start " />

            <div className="flex grid grid-cols-8 gap-4">
              <div className="col-span-4 flex space-x-2 items-center">
                <Controller
                  control={control}
                  name="salesStartDate"
                  rules={{ required: 'Date is required!' }}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker onChange={onChange} selected={value} />
                  )}
                />
              </div>

              <div className="col-span-4 ">
                <Controller
                  control={control}
                  name="salesStartTime"
                  rules={{ required: 'Time is required!' }}
                  render={({ field: { onChange, value } }) => (
                    <TimePicker onChange={onChange} selected={value} />
                  )}
                />
              </div>
            </div>

            <Error errorName={errors.salesStartDate} />
            <Error errorName={errors.salesStartTime} />
          </div>

          <div className="col-span-8 space-y-2">
            <LabelArea label="Sales End " />

            <div className="flex grid grid-cols-8 gap-4">
              <div className="col-span-4 flex space-x-2 items-center">
                <Controller
                  control={control}
                  name="salesEndDate"
                  rules={{ required: 'Date is required!' }}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker onChange={onChange} selected={value} />
                  )}
                />
              </div>

              <div className="col-span-4 ">
                <Controller
                  control={control}
                  name="salesEndTime"
                  rules={{ required: 'Time is required!' }}
                  render={({ field: { onChange, value } }) => (
                    <TimePicker onChange={onChange} selected={value} />
                  )}
                />
              </div>
            </div>

            <Error errorName={errors.salesEndDate} />
            <Error errorName={errors.salesEndTime} />
          </div>
        </div>

        {/* Privacy Options Section */}
        <SectionDividerDrop
          title="Whitelist"
          sectionName="whiteList"
          isCollapsed={infoCollapsed.whiteLIst}
          handleCollapse={toggleInfoCollapse}
        />
        {!infoCollapsed.whiteList && (
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-gray-500 ">Upload by bulk (CSV)</span>
            <div
              className="cursor-pointer bg-gray-200 rounded-md py-2 px-4 text-gray-500"
              onClick={handleWhiteListUploadClick}
            >
              {whiteListFile ? `${whiteListFile.name}` : 'Upload file...'}
            </div>

            <input
              type="file"
              ref={whiteListinputRef}
              onChange={(e) => handleFileChangeWhite(e)}
              style={{ display: 'none' }}
            />

            <span className="text-sm text-gray-500">Add address manually</span>
            <InputArea
              register={register}
              name="whiteListAddress"
              placeholder="Wallet address"
            />

            <div
              className="w-fit cursor-pointer bg-gray-200 rounded-md py-2 px-4 text-gray-500 text-sm "
              onClick={(e) => handleAddAddress('white')}
            >
              Add address
            </div>

            {whiteList &&
              whiteList.map((row, id) => {
                return (
                  <div
                    className="flex justify-between px-4 py-4 border-b"
                    key={id}
                  >
                    <span className="text-gray-500">{row.Address}</span>

                    <span
                      className="cursor-pointer text-gray-500"
                      onClick={() => handleRemove('white', row.Address)}
                    >
                      <AiOutlineClose />
                    </span>
                  </div>
                );
              })}
          </div>
        )}

        {/* Date, Time, Venue Section */}
        <SectionDividerDrop
          title="Blacklist"
          sectionName="blackList"
          isCollapsed={infoCollapsed.blackList}
          handleCollapse={toggleInfoCollapse}
        />
        {!infoCollapsed.blackList && (
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-gray-500 ">Upload by bulk (CSV)</span>
            <div
              className="cursor-pointer bg-gray-200 rounded-md py-2 px-4 text-gray-500"
              onClick={handleBlackListUploadClick}
            >
              {blackListFile ? `${blackListFile.name}` : 'Upload file...'}
            </div>

            <input
              type="file"
              ref={blackListinputRef}
              onChange={(e) => handleFileChangeBlack(e)}
              style={{ display: 'none' }}
            />

            <span className="text-sm text-gray-500">Add address manually</span>
            <InputArea
              register={register}
              name="blackListAddress"
              placeholder="Wallet address"
            />

            <div
              className="w-fit cursor-pointer bg-gray-200 rounded-md py-2 px-4 text-gray-500 text-sm "
              onClick={(e) => handleAddAddress('black')}
            >
              Add address
            </div>

            {blackList &&
              blackList.map((row, id) => {
                return (
                  <div
                    className="flex justify-between px-4 py-4 border-b"
                    key={id}
                  >
                    <span className="text-gray-500">{row.Address}</span>

                    <span
                      className="cursor-pointer text-gray-500"
                      onClick={() => handleRemove('black', row.Address)}
                    >
                      <AiOutlineClose />
                    </span>
                  </div>
                );
              })}
          </div>
        )}

        <Button
          type="button"
          onClick={() => startRecord()}
          layout="primary"
          className="w-full mt-6"
          disabled={loading || isGIFCreated}
        >
          {loading
            ? 'Processing...'
            : isGIFCreated
            ? 'Created'
            : 'Create Ticket Gif'}
        </Button>

        <Button
          type="submit"
          layout="primary"
          className="w-full my-6"
          disabled={!isGIFCreated}
        >
          Next
        </Button>
      </form>
    </div>
  );
};

export default TicketNFTDetails;
