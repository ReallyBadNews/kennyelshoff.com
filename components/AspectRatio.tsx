import type { AspectRatioProps } from "@radix-ui/react-aspect-ratio";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import React from "react";

const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio,
  children,
  ...rest
}) => {
  return (
    <AspectRatioPrimitive.Root ratio={ratio} {...rest}>
      {children}
    </AspectRatioPrimitive.Root>
  );
};

export default AspectRatio;
