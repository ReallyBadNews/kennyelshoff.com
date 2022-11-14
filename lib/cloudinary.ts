import { ImageLoader } from "next/image";

// TOOO: set quality default to "auto"
const cloudinaryLoader: ImageLoader = ({ src, width, quality }) => {
  return `https://res.cloudinary.com/elshoff/image/upload/f_auto/w_${width},q_${
    quality || 75
  }/${src}`;
};

export default cloudinaryLoader;
