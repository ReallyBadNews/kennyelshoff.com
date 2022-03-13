import { Heading } from "@components/Heading";
import type { PageProps } from "@components/Page";
import { Paragraph } from "@components/Paragraph";
import { Stack } from "@components/Stack";
import { FC } from "react";
import { Separator } from "./Separator";

type PageHeaderProps = Omit<PageProps, "stackGap">;

const PageHeader: FC<PageHeaderProps> = ({
  title,
  description,
  showDivider,
}) => {
  if (!title && !description) return null;

  return (
    <>
      <Stack as="header" css={{ stackGap: "$1" }}>
        {title ? (
          <Heading size="3" variant="contrast" weight="9">
            {title}
          </Heading>
        ) : null}
        {description ? (
          <Paragraph size="2" variant="gray">
            {description}
          </Paragraph>
        ) : null}
      </Stack>
      {showDivider && (
        <Separator css={{ backgroundColor: "$slate3", mt: "$5" }} size="full" />
      )}
    </>
  );
};

export default PageHeader;
