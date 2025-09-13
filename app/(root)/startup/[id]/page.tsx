import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queires';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import MarkdownIt from 'markdown-it';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
export const experimental_ppr = true;

const md = new MarkdownIt();

const page = async ({ params }: { params: { id: string } }) => {
  const id = (await params).id;

  const [post, {select:editorPosts}]= await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY,{id}),
    client.fetch(PLAYLIST_BY_SLUG_QUERY,{slug: "editors-collection"}),
  ])

  if (!post) return notFound();
  const pitchHtml = post?.pitch ? md.render(post.pitch) : null;
  return (
    <>
      <section className= "pink_container !min-h-[230px]">
        <p className='tag'>{formatDate(post?._createdAt)}</p>
        <h1 className='text-3xl'>{post.title}</h1>
        <p className='sub-heading !max-w-3xl'>{post.discription || post.description}</p>
      </section>
      <section className='section_container'>
        <img src={post.image} alt="thumbnail" className='w-full max-w-4xl mx-auto h-auto rounded-xl'/>
        <div className='space-y-2 mt-10 max-w-9xl mx-auto' >
          <div className='flex items-center justify-between gap-5'>
            <Link href={`/user/${post.author?._id}`} className='flex gap-3 items-center mb-2'>
              <img src={post.author?.image || '/avatar-placeholder.png'} alt="avatar" width={64} height={64} className="rounded-full drop-shadow-lg"/>
              <div>
                <p className='text-20-medium'>{post.author?.name}</p>
                <p className='text-16-medium !text-black-300'>
                  @{post.author?.username}
                </p>
              </div>
            </Link>

            <p className='category-tag inline-block'>{post.category}</p>
          </div>
          <h3 className='text-30-bold'>Pitch Details</h3>
          {pitchHtml ?(
            <article className='prose max-w-3xl font-work-sans break-all'
             dangerouslySetInnerHTML={{__html:pitchHtml}}/>
          ):(
            <p className='no-result'>No Details Provided</p>
          )}
        </div>
        <hr className='divider'/>
        {editorPosts?.length > 0 && (
          <div className='max-w-4xl mx-auto'>
            <p className='text-30-semibold'>Editor Picks</p>

            <ul className='mt-7 card_grid-sm'>
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                
                  <StartupCard key={i} post={post} />
                
              ))}
            </ul>
          </div>
        )}
        <Suspense fallback={<Skeleton className='view_skeleton'/>}>
          <View id = {id}/>
        </Suspense>
      </section>

    </>
  );
};

export default page;