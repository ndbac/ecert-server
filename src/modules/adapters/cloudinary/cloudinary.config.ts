import * as cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export const cloudinaryUploadImg = async (path: string) => {
  const data = await cloudinary.v2.uploader.upload(path, {
    resource_type: 'auto',
  });
  return {
    url: data?.secure_url,
  };
};
