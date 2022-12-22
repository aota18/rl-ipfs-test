export const imageFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    req.fileValidationError = 'only image files are allowed';
    return callback(null, false);
  }
  callback(null, true);
};

// export const editFileName = (req:any, file:any, callback:any) => {
//     const name = file.originalname.split('.')[0];
//     const fileExtName = extname(file.originalname);
//     const randomName = Array(4).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
//     callback(null, `${name}-${randomName}${fileExtName}`);
// }
