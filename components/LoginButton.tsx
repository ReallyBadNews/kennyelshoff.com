import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Badge } from "./Badge";
import { Button, LinkButton } from "./Button";
import { Paragraph } from "./Paragraph";
import { Stack } from "./Stack";

export function LoginButton() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <Stack
        css={{
          stackGap: "$2",
          p: "$3",
          border: "1px solid $slate5",
          borderRadius: "$lg",
        }}
      >
        <Paragraph>{`Signed in as ${session.user.email}`}</Paragraph>
        <div>
          <Button
            size="3"
            variant="red"
            onClick={() => {
              return signOut();
            }}
          >
            Sign out
          </Button>
        </div>
      </Stack>
    );
  }

  return (
    <Stack
      css={{
        stackGap: "$2",
        p: "$3",
        border: "1px solid $slate5",
        borderRadius: "$lg",
      }}
    >
      <Paragraph>Not signed in</Paragraph>
      <LinkButton
        href="/api/auth/signin/github"
        size="3"
        variant="green"
        onClick={(e) => {
          e.preventDefault();
          signIn("github");
        }}
      >
        Sign In
      </LinkButton>
    </Stack>
  );
}
