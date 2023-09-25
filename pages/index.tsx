import Head from "next/head";
import TopMenu from "@/components/TopMenu";
import SignIn from "@/components/SignIn";

export default function Home() {
  return (
    <>
      <Head>
        <title>Comment to Comet</title>
      </Head>
      <TopMenu />
      <SignIn />
    </>
  );
}
