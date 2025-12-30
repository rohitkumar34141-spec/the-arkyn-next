import "../styles/globals.css";
import Navbar from "../components/Navbar";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />

      {/* FIXED NAVBAR SPACER */}
      <div className="h-20 md:h-24" />

      <Component {...pageProps} />
    </>
  );
}
