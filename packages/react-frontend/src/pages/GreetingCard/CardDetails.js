import { useStateMachine } from "little-state-machine";
import { updateCardDetails } from "../../actions/updateCardDetails";
import React, { useState } from "react";
import PageTitle from "../../components/page-title/PageTitle";
import { Controller, useForm } from "react-hook-form";
import LabelArea from "../../components/form/LabelArea";
import InputArea from "../../components/form/InputArea";
import Error from "../../components/form/Error";
import { Button, Input } from "@windmill/react-ui";
import TagList from "../../components/tags/TagList";
import HeaderNavigator from "../../components/header-navigator/HeaderNavigator";
import { useNavigate } from "react-router-dom";
import CardSelectList from "../../components/card-select/CardSelectList";
import useEnsResolver from "../../hooks/useEnsResolver";
import InputValue from "../../components/form/InputValue";
import TextArea from "../../components/form/TextArea";

const cardSelectItems = [
  {
    id: 0,
    url: "/img/card1.png",
    publicId: "card1_inycxs_vmgzlu",
    color: {
      description: "#a02526",
      fromTo: "#dda062",
    },
  },
  {
    id: 1,
    url: "/img/card2.png",
    publicId: "card2_apnkry_rea1av",
    color: {
      description: "#dda062",
      fromTo: "#a02526",
    },
  },
];

const CardDetails = () => {
  const navigate = useNavigate();

  const { getENSFromAddress, getAddressfromENS } = useEnsResolver();

  const [resolved, setResolved] = useState(null);

  const [tags, setTags] = useState([]);

  // Select Card List
  const [selectedCard, setSelectedCard] = useState(cardSelectItems[0]);

  const onSelectCard = (id) => {
    setSelectedCard(cardSelectItems[id]);
    setValue("selectedCard", cardSelectItems[id]);
  };

  const { actions, state } = useStateMachine({ updateCardDetails });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      ...state.cardInfo,
      selectedCard: selectedCard,
    },
  });

  const onSubmit = (data) => {
    actions.updateCardDetails(data);
    navigate("/greeting-card/preview?step=2");
  };

  const onPressBack = () => {
    navigate("/", { replace: true });
  };

  const onChangeAddress = async (e, onChange) => {
    const value = e.target.value;
    onChange(value);

    if (value.startsWith("0x")) {
      const name = await getENSFromAddress(value);

      if (name) {
        setResolved(name);
      } else {
        setResolved(null);
      }
    } else {
      const address = await getAddressfromENS(value);

      if (address) {
        setResolved(address);
        setValue("recipientAddress", address);
      } else {
        setResolved(null);
      }
    }
  };

  return (
    <div className="p-4">
      <HeaderNavigator back onPressBack={onPressBack} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageTitle text={"Card Details"} />

        <div className="my-6">
          <img src={`/img/step3-1.svg`} alt="step" />
        </div>

        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-8 space-y-2">
            <LabelArea label="Description" />
            <TextArea
              register={register}
              name="description"
              label="Description"
              maxLength={150}
              type="textarea"
              placeholder="Describe your event - Limit to 150 Characters"
              required={true}
            />

            <Error errorName={errors.description} />
          </div>

          <div className="col-span-8 space-y-2">
            <LabelArea label="Select NFT Template" />

            <input {...register("selectedCard")} name="selectedCard" hidden />
            <CardSelectList
              items={cardSelectItems}
              onSelectCard={onSelectCard}
              selectedCard={selectedCard}
            />

            <Error errorName={errors.eventImgFiles} />
          </div>

          <div className="col-span-8 space-y-2">
            <LabelArea label="Recipient Address" />

            <Controller
              control={control}
              rules={{ required: true }}
              name="recipientAddress"
              render={({ field: { value, defaultValues, onChange } }) => (
                <Input
                  onChange={(e) => onChangeAddress(e, onChange)}
                  value={value}
                  placeholder={"Wallet address OR ENS name"}
                  className="border h-10 text-sm focus:outline-none block w-full dark:bg-white border-transparent focus:bg-white"
                />
              )}
            />

            <Error errorName={errors.recipientAddress} />
            {resolved ? (
              <div className="text-gray-500 text-sm mt-2">
                Address was resolved to{" "}
                <span className="text-success">{resolved}</span>
              </div>
            ) : (
              <div className="text-gray-500 text-sm mt-2">
                No resolved name or address found
              </div>
            )}
          </div>

          <div className="col-span-8 space-y-2">
            <LabelArea label="Tags" />
            <TagList tags={tags} setTags={setTags} />
          </div>
        </div>

        <Button type="submit" layout="primary" className="w-full my-6">
          Next
        </Button>
      </form>
    </div>
  );
};

export default CardDetails;
