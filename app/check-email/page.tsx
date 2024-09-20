import { useSession, signIn, signOut } from "next-auth/react";

export default function CheckEmail() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div>
        <h2>Authenticated</h2>
        <p>Signed in as {session.user.email}</p>
        <p>Name: {session.user.name}</p>
        {session.user.image && (
          <img src={session.user.image} alt="Profile image" />
        )}
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Not Authenticated</h2>
      <p>You are not signed in.</p>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
