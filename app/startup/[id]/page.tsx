import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

const md = markdownit();

// Fix the params type to be a regular object, not a Promise
type PageProps = {
  params: {
    id: string;
  };
};

export const experimental_ppr = true;

const Page = async ({ params }: PageProps) => {
  // Remove the await since params is no longer a Promise
  const { id } = params;

  try {
    const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

    if (!post) return notFound();

    const parsedContent = md.render(post?.pitch || "");

    return (
      <>
        <section className="pink_container !min-h-[230px]">
          <p className="tag">{formatDate(post._createdAt)}</p>
          <h1 className="heading">{post.title}</h1>
          <p className="sub-heading !max-w-5xl">{post.description}</p>
        </section>

        <section className="section_container">
          {/* Replace img with Next.js Image component for better optimization */}
          <Image
            src={post.image}
            alt={post.title || "startup thumbnail"}
            width={1200}
            height={630}
            className="w-full h-auto rounded-xl"
            priority
          />

          <div className="space-y-5 mt-10 max-w-4xl mx-auto">
            <div className="flex-between gap-5">
              {post.author && (
                <Link
                  href={`/user/${post.author._id}`}
                  className="flex gap-2 items-center mb-3"
                >
                  <Image
                    src={post.author.image}
                    alt={`${post.author.name}'s avatar`}
                    width={64}
                    height={64}
                    className="rounded-full drop-shadow-lg"
                  />

                  <div>
                    <p className="text-20-medium">{post.author.name}</p>
                    <p className="text-16-medium !text-black-300">
                      @{post.author.username}
                    </p>
                  </div>
                </Link>
              )}

              {post.category && (
                <p className="category-tag">{post.category}</p>
              )}
            </div>

            <h3 className="text-30-bold">Pitch Details</h3>
            {parsedContent ? (
              <article
                className="prose max-w-4xl font-work-sans break-all"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className="no-result">No details provided</p>
            )}
          </div>

          <hr className="divider" />

          <Suspense fallback={<Skeleton className="view_skeleton" />}>
            <View id={id} />
          </Suspense>
        </section>
      </>
    );
  } catch (error) {
    console.error('Error fetching startup:', error);
    return notFound();
  }
};

export default Page;
