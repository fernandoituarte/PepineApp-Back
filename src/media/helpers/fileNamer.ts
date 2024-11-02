import { v4 as uuid } from 'uuid';
export function fileNamer(
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) {
  const fileExtension = file.mimetype.split('/')[1];

  const fileName = `${uuid()}.${fileExtension}`;

  callback(null, fileName);
}
