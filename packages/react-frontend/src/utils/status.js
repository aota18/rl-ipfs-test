export const getColors = (type) => {
  switch (type) {
    case "success":
      return "green";
    case "danger":
      return "red";
    case "alert":
      return "yellow";
    case "info":
      return "blue";
    default:
      return "gray";
  }
};
