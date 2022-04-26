import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { ElementRef, forwardRef } from "react";
import { CSS } from "stitches.config";

type AspectRatioPrimitiveProps = React.ComponentProps<
  typeof AspectRatioPrimitive.Root
>;

type AspectRatioProps = AspectRatioPrimitiveProps & { css?: CSS };

const AspectRatio = forwardRef<
  ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(({ ratio, children, ...rest }, forwardedRef) => {
  return (
    <AspectRatioPrimitive.Root ref={forwardedRef} ratio={ratio} {...rest}>
      {children}
    </AspectRatioPrimitive.Root>
  );
});

AspectRatio.displayName = "AspectRatio";

AspectRatio.defaultProps = {
  css: undefined,
};

export default AspectRatio;
