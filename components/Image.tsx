import NextImage, { ImageProps } from "next/image";
import cloudinaryLoader from "@lib/cloudinary";

interface CustomImageProps extends Omit<ImageProps, "loader"> {
  loader?: ImageProps["loader"] | null;
}

export default function Image({
  loader = cloudinaryLoader,
  ...props
}: CustomImageProps) {
  return (
    <NextImage
      loader={loader === null ? undefined : cloudinaryLoader}
      {...props}
    />
  );
}
