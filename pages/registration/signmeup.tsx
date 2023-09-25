import Head from "next/head";
import TopMenu from "@/components/TopMenu";
import SignUp from "@/components/SignUp";

export default function SignMeUpPage() {
  return (
    <>
      <Head>
        <title>Comment to Comet</title>
      </Head>
      <TopMenu />
      <SignUp />
    </>
  );
}
