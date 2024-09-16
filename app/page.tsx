"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
export default function Home() {
  const session = useSession();
  return (
    <div>
      <h1>Home</h1>
      <p>{JSON.stringify(session)}</p>
      <Button onClick={() => signOut()}>sign out</Button>
    </div>
  );
}
