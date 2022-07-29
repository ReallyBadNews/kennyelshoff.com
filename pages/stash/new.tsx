import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Label } from "@components/Label";
import { LoginButton } from "@components/LoginButton";
import Page from "@components/Page";
import { Stack } from "@components/Stack";
import { sendRequest } from "@lib/fetcher";
import { CreateOrUpdateStashInput } from "@lib/types";
import { Stash, Tag } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();

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
          console.log("response", response);
          router.replace("/stash");
        } else {
          console.error("[new stash error]", response);
          throw new Error(response.message);
        }
      }
    );
  });

  return (
    <Page
      description="Optional fields may be left blank. Bookmarks, articles, tweets, notes and other miscellaneous tidbits I feel the need to enumerate. Maybe I can remember where I saved it this time."
      title="Create new stash"
    >
      <LoginButton />
      {session?.user.role === "ADMIN" ? (
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
              <Label htmlFor="tags">Tags:</Label>
              <Input id="tags" placeholder="Tags" {...register("tags")} />
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
      ) : null}
    </Page>
  );
};

export default NewStash;
