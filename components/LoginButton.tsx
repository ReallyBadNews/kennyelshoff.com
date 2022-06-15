import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <p>{`Signed in as ${session.user.email}`}</p>
        <button
          type="button"
          onClick={() => {
            return signOut();
          }}
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in
      <br />
      <a
        href="/api/auth/signin/github"
        onClick={(e) => {
          e.preventDefault();
          return signIn();
        }}
      >
        Sign in
      </a>
    </>
  );
}
