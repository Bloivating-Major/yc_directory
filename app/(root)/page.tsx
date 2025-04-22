import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import { normalizeSearchQuery } from "@/lib/search";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const rawQuery = (await searchParams).query;
  const query = normalizeSearchQuery(rawQuery);
  
  const params = { 
    search: query
  };
  
  const { data: posts } = await sanityFetch({ 
    query: STARTUPS_QUERY, 
    params 
  });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading rounded-md">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={rawQuery} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${rawQuery}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => (
              <StartupCard 
                key={post._id} 
                post={post as StartupTypeCard} 
              />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}



