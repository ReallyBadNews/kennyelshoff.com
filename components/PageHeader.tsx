import React from "react";
import { Stack } from "@components/Stack";
import { Heading } from "@components/Heading";
import { Paragraph } from "@components/Paragraph";
import type { PageProps } from "@components/Page";

type PageHeaderProps = Pick<PageProps, "title" | "type" | "description">;

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  // type,
  description,
}) => {
  if (!title && !description) return null;

  return (
    <Stack as="header" css={{ stackGap: "$3" }}>
      {title ? (
        <Heading size="2" variant="contrast" weight="9" gradient>
          {title}
        </Heading>
      ) : null}
      {description ? (
        <Paragraph size="1" variant="gray">
          {description}
        </Paragraph>
      ) : null}
    </Stack>
  );
};

export default PageHeader;
