const SectionDivider = ({ title }) => {
  return (
    <div className="border-y border-gray-200 p-3 mt-2 sm: border-none sm:px-0">
      <span className="text-gray-500 sm:text-black sm:font-bold sm:text-2xl">
        {title}
      </span>
    </div>
  );
};

export default SectionDivider;
