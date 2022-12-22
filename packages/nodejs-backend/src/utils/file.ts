export const getFileFromURL = async (fileName, url) => {
  const response = await fetch(url);
  const contentType = response.headers.get('content-type');
  const blob = await response.blob();
  const file = new File([blob], fileName);

  return file;
};
