var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dsisgnblg",
  api_key: "874969174348824",
  api_secret: "c09RlkpbnzEFfRJcUr3zeJ-DnX4",
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

module.exports = async (image) => {
  try {
    const result = await cloudinary.uploader.upload(image, opts);
    console.log(result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.log(error.message);
    throw { message: error.message };
  }
};
