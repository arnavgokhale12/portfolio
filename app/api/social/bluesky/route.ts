import { NextResponse } from "next/server";

const BLUESKY_HANDLE = "arnavgo.bsky.social";
const BLUESKY_PROFILE_URL = `https://bsky.app/profile/${BLUESKY_HANDLE}`;

type BlueskyFeedResponse = {
  feed?: Array<{
    post?: {
      uri?: string;
      author?: { handle?: string };
      record?: {
        text?: string;
        createdAt?: string;
      };
    };
  }>;
};

export const revalidate = 300;

export async function GET() {
  const response = await fetch(
    `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${BLUESKY_HANDLE}&limit=6`,
    {
      next: { revalidate },
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { posts: [], profileUrl: BLUESKY_PROFILE_URL },
      { status: 502 },
    );
  }

  const data = (await response.json()) as BlueskyFeedResponse;
  const posts = (data.feed ?? [])
    .map((item) => item.post)
    .filter((post) => post?.author?.handle === BLUESKY_HANDLE)
    .filter((post) => post?.record?.text && post.record.createdAt)
    .slice(0, 3)
    .map((post) => {
      const rkey = post?.uri?.split("/").at(-1);
      return {
        platform: "bluesky" as const,
        content: post?.record?.text ?? "",
        date: post?.record?.createdAt ?? "",
        link: rkey ? `${BLUESKY_PROFILE_URL}/post/${rkey}` : BLUESKY_PROFILE_URL,
      };
    });

  return NextResponse.json({
    handle: BLUESKY_HANDLE,
    profileUrl: BLUESKY_PROFILE_URL,
    posts,
  });
}
