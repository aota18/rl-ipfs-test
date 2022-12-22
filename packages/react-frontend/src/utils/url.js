export const getStepFromUrl = (url) => {
  const splitted = url.split("/");
  const lastElem = splitted[splitted.length - 1];

  const splittedByDash = splitted.split("-");

  if (splittedByDash.length) {
    return parseInt(splittedByDash[0]);
  } else {
    return 1;
  }
};

export const generatePreviewURL = (file) => {
  return Object.assign(file, { preview: URL.createObjectURL(file) });
};
