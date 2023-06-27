import "@/styles/globals.css";
import localFont from "next/font/local";
import type { AppProps } from "next/app";

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: "./Fredoka.ttf" });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
