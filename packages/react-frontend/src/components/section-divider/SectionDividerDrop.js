import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const SectionDividerDrop = ({
  title,
  sectionName,
  isCollapsed,
  handleCollapse,
}) => {
  return (
    <div
      className="border-y-2 border-gray-200 p-3 my-4 flex justify-between cursor-pointer"
      onClick={() => handleCollapse(sectionName)}
    >
      <span className="text-gray-500">{title}</span>
      {isCollapsed ? (
        <AiOutlineDown className="text-gray-500" />
      ) : (
        <AiOutlineUp className="text-gray-500" />
      )}
    </div>
  );
};

export default SectionDividerDrop;
