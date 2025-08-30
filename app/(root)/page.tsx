import Image from "next/image";
import Navbar from "../../components/Navbar";
import SearchForm from "../../components/SearchForm";
import { StartupCard } from "@/components/StartupCard";

export default async function Home({searchParams}:{
  searchParams: Promise<{query: string}>})

{  
  const query = (await searchParams).query;
  const posts = [{
    _createdAt:new Date(),
    views: 55,
    author : {_id:1, name:'satvic'},
    description: 'This is a sample discription',
    image:'https://images.unsplash.com/photo-1657558045738-21507cf53606?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Robots',
    title: 'Iron Man',
},
];
  return (
    <>
      <section className="pink_container">
        
        <h1 className="heading">
          PITCH YOUR STARTUP, <br /> CONNECT WITH ENTREPRENEURS
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Notified in 
          virtual competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query? `Results for "${query}"` : "Search for Startups"}
        </p>
        <ul className="mt-7 card_grid">
            {posts?.length > 0?(
              posts.map((post:StartUpCardType, index: number) =>
              (<StartupCard key={post?._id ?? index} post={post} />))
            ):(<p className="no-results">No startups found</p>)
            }
        </ul>
        
      </section>
    </>
  );
}
