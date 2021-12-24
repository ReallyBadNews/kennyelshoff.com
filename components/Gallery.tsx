import {
  ReactElement,
  PropsWithChildren,
  Children,
  cloneElement,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@lib/utils";
import { ImageProps } from "next/image";
import { TriangleLeftIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import { Box } from "./Box";
import { IconButton } from "./IconButton";
import { Text } from "./Text";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

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

export const Gallery = ({
  children,
}: {
  children: ReactElement<PropsWithChildren<ImageProps>>[];
}) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, Children.count(children), page);

  const images = Children.map(children, (child) => {
    return cloneElement(
      child,
      {
        draggable: false,
      },
      null
    );
  });

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <figure>
      <Box
        css={{
          position: "relative",
          display: "grid",
          overflow: "hidden",
          borderRadius: "$md",
          bg: "$slate2",
          "& .imageWrap": { gridArea: "1 / 1", cursor: "grab" },
        }}
      >
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={page}
            animate="center"
            className="imageWrap"
            custom={direction}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            exit="exit"
            initial="enter"
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
        <IconButton
          className="next"
          css={{
            position: "absolute",
            top: "50%",
            right: "$5",
            transform: "translateY(-50%)",
            zIndex: 1,
            cursor: "pointer",
          }}
          size="3"
          variant="raised"
          onClick={() => {
            return paginate(1);
          }}
        >
          <TriangleRightIcon />
        </IconButton>
        <IconButton
          className="prev"
          css={{
            position: "absolute",
            top: "50%",
            left: "$5",
            transform: "translateY(-50%)",
            zIndex: 1,
            cursor: "pointer",
          }}
          size="3"
          variant="raised"
          onClick={() => {
            return paginate(-1);
          }}
        >
          <TriangleLeftIcon />
        </IconButton>
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
    </figure>
  );
};
