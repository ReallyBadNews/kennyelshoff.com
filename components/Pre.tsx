import { styled, theme } from "stitches.config";

export const Pre = styled("pre", {
  $$background: "$colors$slate2",
  $$text: "$colors$hiContrast",
  $$outline: "inset 0 0 0 1px $colors$slate6",
  $$syntax1: "$colors$blue11",
  $$syntax2: "$colors$cyan11",
  $$syntax3: "$colors$purple11",
  $$syntax4: "$colors$blue11",
  $$syntax5: "$colors$yellow11",
  $$syntax6: "$colors$pink11",
  $$comment: "$colors$slate10",
  $$removed: "$colors$red11",
  $$added: "$colors$green11",
  $$lineNumbers: "$colors$slate10",
  $$fadedLines: "$colors$slate8",
  $$highlightedLineBg: "$colors$violet3",
  $$highlightedWord1Bg: "$colors$violet4",
  $$highlightedWord1BgActive: "$colors$violet6",
  $$highlightedWord1Text: "$colors$violet11",
  $$highlightedWord2Bg: "$colors$red3",
  $$highlightedWord2BgActive: "$colors$red5",
  $$highlightedWord2Text: "$colors$red11",
  $$highlightedWord3Bg: "$colors$green3",
  $$highlightedWord3BgActive: "$colors$green5",
  $$highlightedWord3Text: "$colors$green11",

  boxSizing: "border-box",
  fontFamily: "$jet",
  fontSize: "$1",
  lineHeight: "21px",
  whiteSpace: "pre",
  position: "relative",
  overflow: "auto",
  backgroundColor: "$$background",
  color: "$$text",
  width: "calc($sizes$full + $8)",
  mx: "-$3",
  // boxShadow: "$$outline",
  py: "$3",

  "@bp1": {
    borderRadius: "$lg",
  },

  "& > code": {
    display: "inline-block",
    flexDirection: "column",
    fontFamily: "inherit",
    width: "$full",
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

  ".token.attr-value, .token.class, .token.string, .token.number, .token.unit, .token.color, .token.boolean, .token.builtin":
    {
      color: "$$syntax5",
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
    color: "$$syntax6",
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
    display: "block",
    px: "$4",
    mx: "-20px",
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

  // Styles for highlighted word
  ".highlight-word": {
    $$bgAndShadow: "$$highlightedWord1Bg",
    $$xOffset: "0px",
    textDecoration: "none",
    color: "$$highlightedWord1Text",
    backgroundColor: "$$bgAndShadow",
    display: "inline-block",
    boxShadow: "$$xOffset 0 0 0 $$bgAndShadow, -$$xOffset 0 0 0 $$bgAndShadow",
    borderRadius: "$sm",

    // reset the color for tokens inside highlighted words
    ".token": {
      color: "inherit",
    },

    "&:is(a):hover, &.on": {
      $$bgAndShadow: "$$highlightedWord1BgActive",
      transition: "all 100ms ease",
      cursor: "pointer",
    },
  },

  ".token.deleted .highlight-word": {
    $$bgAndShadow: "$$highlightedWord2Bg",
    color: "$$highlightedWord2Text",

    "&.on": {
      $$bgAndShadow: "$$highlightedWord2BgActive",
    },
  },

  ".token.inserted .highlight-word": {
    $$bgAndShadow: "$$highlightedWord3Bg",
    color: "$$highlightedWord3Text",

    "&.on": {
      $$bgAndShadow: "$$highlightedWord3BgActive",
    },
  },

  // Preview
  "[data-preview] + &": {
    mt: "0",
    br: "0 0 $lg $lg",
  },

  // Styles for highlighted lines
  ".highlight-line": {
    pr: "$3",
    display: "inline",
    minWidth: "$full",
    "&, *": {
      transition: "color 150ms ease",
    },
    "&[data-highlighted=false]": {
      "&, *": {
        color: "$$fadedLines",
      },
    },
  },

  // data-invert-line-highlight
  // Styles for inverted line highlighting
  "&[data-invert-line-highlight=true] .highlight-line": {
    mx: "-$5",
    px: "$5",
    "&[data-highlighted=true]": {
      backgroundColor: "$$highlightedLineBg",
    },
  },

  // Typewriter styles
  ".typewriter": {
    opacity: 0,
  },

  variants: {
    theme: {
      violet: {
        $$background: "$colors$violet2",
        $$text: "$colors$violet11",
        $$outline: "inset 0 0 0 1px $colors$violet4",
        $$syntax1: "$colors$blue10",
        $$syntax2: "$colors$pink11",
        $$comment: "$colors$mauve9",
        $$fadedLines: "$colors$mauveA8",
      },
      blue: {
        $$background: theme.colors.slate12.value,
        $$text: theme.colors.gray5.value,
        $$outline: "none",
        $$syntax1: theme.colors.blue8.value,
        $$syntax2: theme.colors.pink8.value,
        $$syntax3: theme.colors.blue8.value,
        $$syntax4: theme.colors.blue8.value,
        $$comment: theme.colors.slate9.value,
        $$removed: "$colors$red9",
        $$added: "$colors$green9",
        $$lineNumbers: "hsl(210 37% 35%)",
        $$fadedLines: theme.colors.slate11.value,
        $$highlightedWord1Bg: "$colors$indigo12",
        $$highlightedWord1BgActive: "$colors$indigo11",
        $$highlightedWord1Text: "$colors$indigo4",
        $$highlightedWord2Bg: "$colors$red12",
        $$highlightedWord2BgActive: "$colors$red11",
        $$highlightedWord2Text: "$colors$red4",
        $$highlightedWord3Bg: "$colors$green12",
        $$highlightedWord3BgActive: "$colors$green11",
        $$highlightedWord3Text: "$colors$green4",
      },
    },
    showLineNumbers: {
      true: {
        ".highlight-line": {
          position: "relative",

          "&::before": {
            content: "attr(data-line)",
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
        ".highlight-line": { paddingLeft: "$4" },
      },
    },
    filename: {
      true: {
        "&::before": {
          content: "attr(data-filename)",
          backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,<svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H7.5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z' fill='%23aaa' fill-rule='evenodd' clip-rule='evenodd'></path></svg>\")",
          backgroundPosition: "0 3px",
          backgroundRepeat: "no-repeat",
          display: "block",
          color: "$$lineNumbers",
          marginLeft: "$3",
          paddingBottom: "$3",
          paddingLeft: "$5",
        },
      },
    },
  },
  defaultVariants: {
    showLineNumbers: false,
    theme: "default",
  },
});

Pre.displayName = "Pre";
