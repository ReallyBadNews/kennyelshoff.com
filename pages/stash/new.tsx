import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Label } from "@components/Label";
import Page from "@components/Page";
import { Stack } from "@components/Stack";
import { sendRequest } from "@lib/fetcher";
import { CreateOrUpdateStashInput } from "@lib/types";
import { Stash, Tag } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";

type NewStashResponse = Stash & {
  tags: Tag[];
};

type NewStashError = {
  message: string;
};

const NewStash: NextPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateOrUpdateStashInput>();

  const { trigger } = useSWRMutation<NewStashResponse | NewStashError>(
    `/api/stash/new`,
    sendRequest
  );

  const onSubmit = handleSubmit(async (data) => {
    await trigger(data, { revalidate: true, populateCache: true }).then(
      (response) => {
        if (!response) throw new Error("No response from server");
        if ("id" in response) {
          router.replace("/stash");
        } else {
          console.error("[new stash error]", response);
        }
      }
    );
  });

  return (
    <Page
      description="Optional fields may be left blank. Bookmarks, articles, tweets, notes and other miscellaneous tidbits I feel the need to enumerate. Maybe I can remember where I saved it this time."
      title="Create new stash"
    >
      <form onSubmit={onSubmit}>
        <Stack css={{ stackGap: "$4" }}>
          <Stack css={{ stackGap: "$2" }}>
            <Label htmlFor="title">Title:</Label>
            <Input id="title" placeholder="title" {...register("title")} />
            {errors.title?.type === "required" && "Title is required"}
          </Stack>
          <Stack css={{ stackGap: "$2" }}>
            <Label htmlFor="url">URL:</Label>
            <Input id="url" placeholder="URL" {...register("url")} />
            {errors.url?.type === "required" && "URL is required"}
          </Stack>
          <Stack css={{ stackGap: "$2" }}>
            <Label htmlFor="description">Description:</Label>
            <Input
              id="description"
              placeholder="Description"
              {...register("description")}
            />
          </Stack>
          <Stack css={{ stackGap: "$2" }}>
            <Label htmlFor="body">Body:</Label>
            <Input
              as="textarea"
              id="body"
              placeholder="Body"
              rows={5}
              {...register("body")}
            />
          </Stack>
          <Stack css={{ stackGap: "$2" }} direction="row">
            <Button
              size="2"
              type="button"
              variant="red"
              onClick={() => {
                router.back();
                reset();
              }}
            >
              Cancel
            </Button>
            <Button size="2" type="submit">
              Create stash
            </Button>
          </Stack>
        </Stack>
      </form>
    </Page>
  );
};

export default NewStash;
