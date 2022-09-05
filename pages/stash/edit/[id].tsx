import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Label } from "@components/Label";
import Page from "@components/Page";
import { Stack } from "@components/Stack";
import { useStash, useStashes } from "@hooks/use-stash";
import { getAllStashes, getStashById, NewStash, Stash } from "@lib/stash";
import { CreateOrUpdateStashInput } from "@lib/types";
import { useRouter } from "next/router";
import { GetStaticPaths, InferGetStaticPropsType } from "next/types";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllStashes().then((stashes) => {
    return stashes.stashes.map((post) => {
      return {
        params: {
          id: post.id,
        },
      };
    });
  });

  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params: { id = "" } = {} }) => {
  const stash = await getStashById(id);

  return {
    props: {
      id: stash?.id,
      stash,
    },
  };
};

const StashEditPage = ({
  id,
  stash: fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { stash, mutate } = useStash({ id, fallbackData });
  const { mutate: mutateAllStashes } = useStashes({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateOrUpdateStashInput>({
    defaultValues: {
      title: fallbackData?.title,
      url: fallbackData?.url,
      description: fallbackData?.description,
      tags: fallbackData?.tags
        .map((tag) => {
          return tag.name;
        })
        .join(", "),
      image: fallbackData?.image?.src,
      imageAlt: fallbackData?.image?.alt,
      body: fallbackData?.body,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    const updatedStash = {
      ...stash,
      ...data,
      date: undefined,
    };

    const newStash = await fetch(`/api/stash/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedStash),
    }).then(async (res) => {
      const json: NewStash = await res.json();
      return json;
    });

    console.log("[STASH EDIT]", { newStash });

    await mutate(newStash);

    await mutateAllStashes(async (prevData) => {
      const filteredStashes = prevData?.stashes.filter((post) => {
        return post.id !== id;
      }) as Stash[];

      return {
        stashes: filteredStashes,
        total: filteredStashes.length,
        page: prevData?.page || 1,
      };
    });

    router.replace(`/stash/${newStash.slug}`);
    setIsLoading(false);
  });

  return (
    <Page>
      <form onSubmit={onSubmit}>
        <Stack css={{ stackGap: "$4" }}>
          <Stack css={{ stackGap: "$2" }}>
            <Label htmlFor="title">Title:</Label>
            <Input id="Title" placeholder="title" {...register("title")} />
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
            <Label htmlFor="image-alt">Image Alt Text:</Label>
            <Input
              id="image-alt"
              placeholder="Image Alt Text"
              {...register("imageAlt")}
            />
          </Stack>
          <Stack css={{ stackGap: "$2" }}>
            <Label htmlFor="image">Image:</Label>
            <Input id="image" placeholder="Image" {...register("image")} />
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
            <Button disabled={isLoading} size="2" type="submit">
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Page>
  );
};

export default StashEditPage;
