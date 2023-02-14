const url =
  'https://cdn.shopify.com/s/files/1/0234/8017/2591/products/young-man-in-bright-fashion_925x_f7029e2b-80f0-4a40-a87b-834b9a283c39.jpg?v=1572867553';
const fileName = 'myFile.jpg';

export const imgToFile = (url) => {
  fetch(url).then(async (response) => {
    const contentType = response.headers.get('content-type');
    const blob = await response.blob();
    const file = new File([blob], fileName, { contentType });
    console.log(file);
  });
};

export const getExtension = (filename) => {
  return filename.split('.').pop();
};
