import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Label } from "@components/Label";
import Page from "@components/Page";
import { Stack } from "@components/Stack";
import { useStashes } from "@hooks/use-stash";
import { getMetadataFromUrl } from "@lib/metadata";
import { NewStash } from "@lib/stash";
import { CreateOrUpdateStashInput } from "@lib/types";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

const NewStashPage: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate } = useStashes({});
  const [isLoading, setIsLoading] = useState(false);
  const [generatingMetadata, setGeneratingMetadata] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateOrUpdateStashInput>();

  const url = watch("url");

  const getMetadata = async () => {
    setGeneratingMetadata(true);
    fetch(`/api/edge/metatags?url=${url}`).then(async (res) => {
      if (res.status === 200) {
        const results: Awaited<ReturnType<typeof getMetadataFromUrl>> =
          await res.json();

        console.log("[DEBUG] results", results);

        if (results) {
          setValue("title", results.title);
          setValue("description", results.description);
          setValue("image", results.image);
        }

        setGeneratingMetadata(false);
      }
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    await mutate(
      async (prevData) => {
        console.log("[NewStashPage] prevData", prevData);

        const newStash = await fetch(`/api/stash/new`, {
          method: "POST",
          body: JSON.stringify(data),
        }).then(async (res) => {
          const json: NewStash = await res.json();

          return json;
        });

        console.log("[new stash]", { newStash });

        return {
          stashes: prevData?.stashes
            ? [...prevData.stashes, newStash]
            : [newStash],
          total: (prevData?.total && prevData.total + 1) || 1,
          page: prevData?.page || 1,
        };
      },
      { revalidate: false },
    );

    console.log("[NewStashPage] stash created");

    router.replace("/stash");
  });

  return (
    <Page
      description="Optional fields may be left blank. Bookmarks, articles, tweets, notes and other miscellaneous tidbits I feel the need to enumerate. Maybe I can remember where I saved it this time."
      title="Create new stash"
    >
      {/* <LoginButton /> */}
      <form onSubmit={onSubmit}>
        <Stack css={{ stackGap: "$4" }}>
          <Stack css={{ stackGap: "$2" }}>
            <Stack
              css={{
                stackGap: "$1",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              direction="row"
            >
              <Label htmlFor="url">URL:</Label>
              <Button
                disabled={!url || url?.length === 0 || generatingMetadata}
                type="button"
                onClick={getMetadata}
              >
                {generatingMetadata && "Loading..."}
                <p>{generatingMetadata ? "Generating" : "Generate from URL"}</p>
              </Button>
            </Stack>
            <Input
              id="url"
              placeholder="URL"
              {...register("url", { required: true })}
            />
            {errors.url?.type === "required" && "URL is required"}
          </Stack>
          <Stack css={{ stackGap: "$2" }}>
            <Label htmlFor="title">Title:</Label>
            <Input id="title" placeholder="Title" {...register("title")} />
            {errors.title?.type === "required" && "Title is required"}
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
            <Label htmlFor="image">Image:</Label>
            <Input id="image" placeholder="Image" {...register("image")} />
          </Stack>
          <Stack css={{ stackGap: "$2" }}>
            <Label htmlFor="image-alt">Image Alt Text:</Label>
            <Input
              id="image-alt"
              placeholder="Image Alt Text"
              {...register("imageAlt")}
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
            <Button
              disabled={isLoading || session?.user.role !== "ADMIN"}
              size="2"
              type="submit"
            >
              {isLoading ? "Saving..." : "Create stash"}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Page>
  );
};

export default NewStashPage;
