import moment from "moment";
import { useState } from "react";
import { AiFillEnvironment } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { getMintString, truncateString } from "../../utils/string";

const ImageSlider = ({ items }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const goPrevious = () => {
    const isFirstSlide = currentIdx === 0;

    const newIdx = isFirstSlide ? items.length - 1 : currentIdx - 1;
    setCurrentIdx(newIdx);
  };
  const goNext = () => {
    const isLastSlide = currentIdx === items.length - 1;

    const newIdx = isLastSlide ? 0 : currentIdx + 1;
    setCurrentIdx(newIdx);
  };

  return (
    <>
      <div
        className="h-1/4 lg:h-1/3 bg-cover flex flex-col justify-center brightness-50 lg:rounded-md"
        style={{ backgroundImage: `url(${items[currentIdx].medias[0].url})` }}
      >
        <div className="w-full flex flex-justify-center justify-between">
          <div className="left-4 text-3xl cursor-pointer">
            <div
              onClick={() => goPrevious()}
              className=" w-12 h-12 text-white rounded-full p-2 text-gray-500 hover:text-white"
            >
              <BsChevronLeft />
            </div>
          </div>
          <div className=" right-4 text-white text-3xl cursor-pointer ">
            <div
              onClick={() => goNext()}
              className=" w-12 h-12 text-white rounded-full p-2 text-gray-500 hover:text-white"
            >
              <BsChevronRight />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-3 p-4 justify-center w-full border-b lg:border-none lg:mt-4">
        <span className="text-gray-500 text-sm  lg:font-bold lg:text-lg lg:text-black">
          {moment.unix(items[currentIdx].eventStartDt).format("ddd, MMM D")}{" "}
          {getMintString(items[currentIdx].eventStartDt)}
        </span>
        <span className="dark:text-gray-200 sm:text-xl lg:font-extrabold lg:text-2xl">
          {items[currentIdx].title}
        </span>
        <span className="flex items-center text-gray-500 text-sm space-x-2  ">
          <AiFillEnvironment className="w-3 h-3 sm:w-5 sm:h-5" />
          <span>{truncateString(items[currentIdx].eventAddress1, 20)}</span>
        </span>

        <div className="flex justify-between">
          <div className="flex items-center space-x-1">
            <img
              src="clapping.svg"
              className="w-4 h-4 sm:w-5 sm:h-5"
              alt="clapping"
            />
            <span className="dark:text-gray-200">
              {items[currentIdx].claps || 0}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
