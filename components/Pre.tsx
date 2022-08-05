import { styled, VariantProps } from "stitches.config";

export type PreProps = VariantProps<typeof Pre>;

export const Pre = styled("pre", {
  $$background: "$colors$slate2",
  $$text: "$colors$hiContrast",
  $$outline: "inset 0 0 0 1px $colors$slate6",
  $$syntax1: "$colors$blue11",
  $$syntax2: "$colors$sky11",
  $$syntax3: "$colors$teal11",
  $$syntax4: "$colors$sky9",
  $$syntax5: "$colors$cyan11",
  $$comment: "$colors$slate10",
  $$removed: "$colors$red11",
  $$added: "$colors$green11",
  $$lineNumbers: "$colors$slate10",
  $$fadedLines: "$colors$slate8",
  $$highlightedLineBg: "$colors$skyA3",
  $$highlightedLineBorder: "$colors$skyA6",

  fontFamily: "$jet",
  fontSize: "$0",
  overflow: "auto",
  backgroundColor: "$$background",
  color: "$$text",
  width: "calc($sizes$full + $8)",
  mx: "-$3",
  py: "$3",

  "@bp1": {
    fontSize: "$1",
    borderRadius: "$lg",
  },

  "& > code": {
    fontFamily: "inherit",
    float: "left",
    minWidth: "$full",
  },

  // Dim lines that aren't part of the diff
  ".language-diff": {
    color: "$$comment",
  },

  ".token.parameter": {
    color: "$$text",
  },

  ".token.tag, .token.class-name, .token.selector, .token.selector .class, .token.function":
    {
      color: "$$syntax1",
    },

  ".token.attr-value, .token.class, .token.string, .token.number, .token.unit, .token.color, .token.builtin, .token.boolean":
    {
      color: "$$syntax2",
    },

  ".token.attr-name, .token.keyword, .token.rule, .token.operator, .token.pseudo-class, .token.important":
    {
      color: "$$syntax3",
    },

  ".token.punctuation, .token.module, .token.property, .token.property-access":
    {
      color: "$$syntax4",
    },

  ".token.imports, .token.maybe-class-name": {
    color: "$$syntax5",
  },

  ".token.comment": {
    color: "$$comment",
  },

  ".token.atapply .token:not(.rule):not(.important)": {
    color: "inherit",
  },

  ".language-shell .token:not(.comment)": {
    color: "inherit",
  },

  ".language-css .token.function": {
    color: "inherit",
  },

  ".token.deleted:not(.prefix), .token.inserted:not(.prefix)": {
    px: "$4",
    mx: "-$4",
  },

  ".token.deleted:not(.prefix)": {
    color: "$$removed",
  },

  ".token.inserted:not(.prefix)": {
    color: "$$added",
  },

  ".token.deleted.prefix, .token.inserted.prefix": {
    userSelect: "none",
  },

  // Preview
  "[data-preview] + &": {
    mt: "0",
    br: "0 0 $lg $lg",
  },

  // Styles for highlighted lines
  ".code-line": {
    pr: "$3",
    display: "block",
    minWidth: "$full",
    "&, *": {
      transition: "color 150ms ease",
    },
    "&.highlight-line": {
      "&:after": {
        backgroundColor: "$$highlightedLineBg",
        content: '" "',
        left: "0",
        borderLeft: "$space$1 solid $$highlightedLineBorder",
        pointerEvents: "none",
        position: "absolute",
        top: "0",
        width: "100%",
      },
    },
  },

  // Typewriter styles
  ".typewriter": {
    opacity: 0,
  },

  variants: {
    showLineNumbers: {
      true: {
        ".code-line": {
          position: "relative",

          "&::before": {
            content: "attr(line)",
            pr: "$4",
            width: "$14",
            display: "inline-block",
            backgroundColor: "$$background",
            textAlign: "right",
            position: "sticky",
            left: "0",
            color: "$$lineNumbers",
          },
        },
      },
      false: {
        ".code-line": { paddingLeft: "$4" },
      },
    },
    filename: {
      true: {
        "&:before": {
          content: "attr(data-filename)",
          position: "sticky",
          fontSize: "$0",
          left: "$3",
          backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,<svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H7.5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z' fill='%23aaa' fill-rule='evenodd' clip-rule='evenodd'></path></svg>\")",
          backgroundPosition: "4px 1px",
          backgroundRepeat: "no-repeat",
          display: "block",
          color: "$$comment",
          marginLeft: "$3",
          paddingBottom: "$2",
          paddingLeft: "$6",
        },
      },
    },
  },
  compoundVariants: [
    {
      showLineNumbers: false,
      filename: true,
      css: {
        "&:before": {
          paddingBottom: "$3",
          paddingLeft: "$5",
        },
      },
    },
  ],
  defaultVariants: {
    showLineNumbers: false,
  },
});

Pre.displayName = "Pre";
