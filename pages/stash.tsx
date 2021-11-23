import { Grid } from "@components/Grid";
import Page from "@components/Page";
import { Box } from "@components/Box";
import AspectRatio from "@components/AspectRatio";

export default function Stash() {
  return (
    <Page
      description="Bookmarks, save for later, and other miscellaneous tidbits I feel the need to save for later"
      title="Stash"
    >
      <Grid columns={{ "@initial": 1, "@bp1": 2, "@bp2": 3 }} gap="4">
        {Array.from({ length: 9 }).map((_, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <AspectRatio key={index} ratio={1}>
              <Box
                css={{
                  width: "$full",
                  height: "$full",
                  bg: "$slateA2",
                  border: "1px solid $slateA3",
                  borderRadius: "$lg",
                }}
              />
            </AspectRatio>
          );
        })}
      </Grid>
    </Page>
  );
}
