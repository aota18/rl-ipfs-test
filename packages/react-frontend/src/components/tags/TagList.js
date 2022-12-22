import ReactTagInput from "@pathofdev/react-tag-input";

const TagList = ({ tags, setTags }) => {
  return <ReactTagInput tags={tags} onChange={(newTags) => setTags(newTags)} />;
};

export default TagList;
