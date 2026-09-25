import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error JSX module without type declarations
import SongHandlerApp from "@/components/song-handler/App.jsx";

export const Route = createFileRoute("/")({
  // The Song-Handler app is a client-side SPA that reads localStorage/window
  // during render, so it renders on the client only.
  ssr: false,
  head: () => ({
    meta: [
      { title: "Song-Handler — Discover & Save Your Favorite Albums" },
      {
        name: "description",
        content:
          "Song-Handler by MAE: search millions of albums, explore today's specials and trending music, and save your favorites.",
      },
      { property: "og:title", content: "Song-Handler — Discover & Save Your Favorite Albums" },
      {
        property: "og:description",
        content:
          "Search millions of albums, explore today's specials and trending music, and save your favorites.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <SongHandlerApp />;
}
