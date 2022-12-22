import React from "react";
import { useParams } from "react-router-dom";

const AllowBlock = () => {
  let { id } = useParams();

  return <div>AllowBlock</div>;
};

export default AllowBlock;
