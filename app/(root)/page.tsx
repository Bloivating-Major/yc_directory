import { auth } from "@/auth";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({searchParams, } : {
  searchParams : Promise<{query? : string}>
}) {

   const query = (await searchParams).query;

   const posts = [{
    _createdAt :  new Date(),
    views : 55,
    author : { _id : 1 , name : "Sambhav" , image : "https://i.pinimg.com/736x/12/fc/02/12fc02b5c642e295b71365521d9d32dc.jpg"},
    _id : 1,
    description : "This is a description",
    image : "https://i.pinimg.com/736x/12/fc/02/12fc02b5c642e295b71365521d9d32dc.jpg",
    category : "Watch",
    title : "Podium",
   }];

  //  const params = { search : query || null };

  //  const session = await auth();

  //  console.log(session?.id);



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

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
   </>
  );
}
