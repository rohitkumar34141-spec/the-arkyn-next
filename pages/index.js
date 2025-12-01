import Head from "next/head";
import Hero from "../components/Hero";
import FeaturedCollections from "../components/FeaturedCollections";
import WhyArkyn from "../components/WhyArkyn";

export default function Home() {
  return (
    <>
      <Head>
        <title>The Arkyn — Home</title>
        <meta
          name="description"
          content="The Arkyn — premium streetwear. Slow releases, thoughtful pieces."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navbar is already in _app.js */}
      <Hero />
      <FeaturedCollections />
      <WhyArkyn />
    </>
  );
}

