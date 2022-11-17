import NextImage, { ImageProps } from "next/image";
import cloudinaryLoader from "@lib/cloudinary";

interface CustomImageProps extends Omit<ImageProps, "loader"> {
  loader?: ImageProps["loader"] | null;
}

/**
 * Custom image component that uses the Cloudinary loader by default.
 * when `loader` is set to `null`, the Next.js default loader is used.
 */
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
