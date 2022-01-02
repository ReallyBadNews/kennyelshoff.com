/**
 * Thanks to the great Framer Motion docs for the great demo
 * https://codesandbox.io/s/framer-motion-image-gallery-pqvx3
 */

import { wrap } from "@lib/utils";
import { TriangleLeftIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  Variants,
} from "framer-motion";
import { ImageProps } from "next/image";
import {
  Children,
  cloneElement,
  PropsWithChildren,
  ReactElement,
  useState,
} from "react";
import { CSS } from "stitches.config";
import { Box } from "./Box";
import { IconButton } from "./IconButton";
import { Text } from "./Text";
import { Tooltip } from "./Tooltip";

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

interface GalleryProps {
  children:
    | ReactElement<PropsWithChildren<ImageProps>>
    | ReactElement<PropsWithChildren<ImageProps>>[];
  css?: CSS;
  aspectRatio?: CSS["aspectRatio"];
}

export const Gallery = ({ aspectRatio, children, css }: GalleryProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [[page, direction], setPage] = useState([0, 0]);

  /**
   * Say we have 3 images, we paginate them absolutely  (ie 1, 2, 3, 4, 5...)
   * and then wrap that within 0-2 to find our image ID in the array below.
   * By passing an absolute page index as the `motion` component's `key` prop,
   * `AnimatePresence` will detect it as an entirely new image. So you can infinitely
   * paginate as few as 1 images.
   */
  const imageIndex = wrap(0, Children.count(children), page);

  const images = Children.map(children, (child) => {
    return cloneElement(child, { draggable: false }, null);
  });

  /**
   * Set the absolute page index and last direction of the last swipe.
   */
  const paginate = (newDirection: -1 | 1) => {
    setPage([page + newDirection, newDirection]);
  };

  const variants: Variants = {
    enter: (dir: number) => {
      return shouldReduceMotion
        ? { opacity: 0 }
        : {
            x: dir > 0 ? 1000 : -1000,
            opacity: 0,
          };
    },
    center: shouldReduceMotion
      ? { opacity: 1 }
      : {
          zIndex: 1,
          x: 0,
          opacity: 1,
        },
    exit: (dir: number) => {
      return shouldReduceMotion
        ? { opacity: 0 }
        : {
            zIndex: 0,
            x: dir < 0 ? 1000 : -1000,
            opacity: 0,
          };
    },
  };

  return (
    <Box as="figure" css={css}>
      <Box
        css={{
          position: "relative",
          display: "grid",
          overflow: "hidden",
          borderRadius: "$md",
          bg: "$slate2",
          border: "1px solid $slate6",
          "& .imageWrap": {
            position: "relative",
            gridArea: "1 / 1",
            display: "grid",
            alignItems: "center",
            aspectRatio,
          },
        }}
      >
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={page}
            animate="center"
            className="imageWrap"
            custom={direction}
            drag={shouldReduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            exit="exit"
            initial="enter"
            style={shouldReduceMotion ? undefined : { cursor: "grab" }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            variants={variants}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            {images?.[imageIndex]}
          </motion.div>
        </AnimatePresence>
        <Tooltip align="center" content="Next Photo" side="bottom">
          <IconButton
            className="next"
            css={{
              position: "absolute",
              top: "50%",
              right: "$3",
              transform: "translateY(-50%)",
              zIndex: 1,
              cursor: "pointer",
              "@bp1": { right: "$5" },
            }}
            size={{ "@initial": "2", "@bp1": "3" }}
            variant="raised"
            onClick={() => {
              return paginate(1);
            }}
          >
            <TriangleRightIcon />
          </IconButton>
        </Tooltip>
        <Tooltip align="center" content="Previous Photo" side="bottom">
          <IconButton
            className="prev"
            css={{
              position: "absolute",
              top: "50%",
              left: "$3",
              transform: "translateY(-50%)",
              zIndex: 1,
              cursor: "pointer",
              "@bp1": { left: "$5" },
            }}
            size={{ "@initial": "2", "@bp1": "3" }}
            variant="raised"
            onClick={() => {
              return paginate(-1);
            }}
          >
            <TriangleLeftIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        as="figcaption"
        css={{ mt: "$2", fontFamily: "$mono", textAlign: "right" }}
      >
        <Text css={{ ml: "auto" }} size="0">
          {imageIndex + 1}
          <Text aria-label="of" css={{ px: "$1", display: "inline" }}>
            /
          </Text>
          {Children.count(children)}
        </Text>
      </Box>
    </Box>
  );
};

Gallery.defaultProps = {
  aspectRatio: 16 / 9,
  css: undefined,
};

Gallery.displayName = "Gallery";
