import { Separator } from "@components/Separator";
import { Stack } from "@components/Stack";
import { StashPost } from "@components/Stash/StashPost";
import { useStashes } from "@hooks/use-stash";
import { AllStashes } from "@lib/stash";
import { FC, Fragment } from "react";

export interface StashListProps {
  pageIndex?: number;
  pageLimit?: number;
  deleteHandler: (id: string) => void | Promise<void>;
  fallbackData?: AllStashes;
}

export const StashList: FC<StashListProps> = ({
  pageIndex = 1,
  pageLimit = 5,
  deleteHandler,
  fallbackData,
}) => {
  const { data } = useStashes({
    page: pageIndex,
    limit: pageLimit,
    fallbackData,
  });

  return (
    <Stack css={{ stackGap: "$5", "@bp1": { stackGap: "$7" } }}>
      {data?.stashes.map((stash, index) => {
        return (
          <Fragment key={stash.slug}>
            <StashPost deleteHandler={deleteHandler} {...stash} />
            {index !== data.stashes.length - 1 && (
              <Separator size="full" tone="gradient" />
            )}
          </Fragment>
        );
      })}
    </Stack>
  );
};
