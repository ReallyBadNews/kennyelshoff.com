import { styled, childWithGap } from "stitches.config";
import { Paragraph, ParagraphProps } from "./Paragraph";
import { Box } from "./Box";

const ListBase = styled("ul", {
  listStyle: "none",
  pl: "0",
  color: "$hiContrast",
});

interface ListProps {
  children?: React.ReactNode;
  type?: "ul" | "ol";
}

interface ListItemProps {
  children?: React.ReactNode;
  size?: ParagraphProps["size"];
}

export const List = ({ children, type = "ul" }: ListProps) => {
  return (
    <ListBase
      as={type}
      css={{
        [childWithGap]: { margin: "$3 0 0 0" },
        ...(type === "ol"
          ? {
              "--counterName": "counts",
              counterReset: "var(--counterName)",
              "& li": {
                display: "flex",
                counterIncrement: "var(--counterName)",
                "&:before": {
                  pr: "$2",
                  color: "$slate10",
                  content: 'counters(var(--counterName),".") ". "',
                },
                "&:not(:first-child)": { mt: "$3" },
              },
            }
          : {
              "& li": {
                display: "flex",
                "&:before": {
                  // content with right arrow glyph
                  content: '"\\2192"',
                  pr: "$2",
                  color: "$slate10",
                },
              },
            }),
      }}
    >
      {children}
    </ListBase>
  );
};

const ListItem = ({ children, size = "1" }: ListItemProps) => {
  return (
    <Paragraph as="li" size={size} variant="contrast">
      <Box css={{ flex: "1 1 0" }}>{children}</Box>
    </Paragraph>
  );
};

ListItem.defaultProps = {
  children: undefined,
  size: "1",
};

ListItem.displayName = "ListItem";

List.displayName = "List";

List.Item = ListItem;

List.defaultProps = {
  children: undefined,
  type: "ul",
};
