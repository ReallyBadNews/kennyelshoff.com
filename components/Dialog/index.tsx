import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { styled, CSS, keyframes } from "stitches.config";
import { panelStyles } from "@components/Panel";
import { overlayStyles } from "@components/Overlay";
import { IconButton } from "@components/IconButton";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, overlayStyles, {
  position: "fixed",
  inset: "0",
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, panelStyles, {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 200,
  maxHeight: "85vh",
  padding: "$5",

  // Among other things, prevents text alignment inconsistencies when dialog can't be centered in the viewport evenly.
  // Affects animated and non-animated dialogs alike.
  willChange: "transform",

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },

  "&:focus": {
    outline: "none",
  },
});

const StyledCloseButton = styled(DialogPrimitive.Close, {
  position: "absolute",
  top: "$2",
  right: "$2",
});

type DialogContentPrimitiveProps = React.ComponentProps<
  typeof DialogPrimitive.Content
>;

type DialogContentProps = DialogContentPrimitiveProps & { css?: CSS };

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  DialogContentProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props} ref={forwardedRef}>
        {children}
        <StyledCloseButton asChild>
          <IconButton variant="ghost">
            <Cross1Icon />
          </IconButton>
        </StyledCloseButton>
      </StyledContent>
    </DialogPrimitive.Portal>
  );
});

DialogContent.displayName = "DialogContent";

DialogContent.defaultProps = {
  css: undefined,
};

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
