import Head from "next/head";
import TopMenu from "@/components/TopMenu";
import QuestionnaireContent from "@/components/FlyingQuestionnaire";

export default function Questionnaire() {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css"
        />

        <title>Comment to Comet</title>
      </Head>
      <TopMenu />
      <QuestionnaireContent />
    </>
  );
}
