import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queires';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
export const experimental_ppr = true;

const page = async ({ params }: { params: { id: string } }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUP_BY_ID_QUERY,{id});
  if (!post) return notFound();
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
          {post?.pitch ?(
            <article className='prose max-w-3xl font-work-sans break-all'
             dangerouslySetInnerHTML={{__html:post.pitch}}/>
          ):(
            <p className='no-result'>No Details Provided</p>
          )}
        </div>
        <hr className='divider'/>
        <Suspense fallback={<Skeleton className='view_skeleton'/>}>
          <View id = {id}/>
        </Suspense>
      </section>

    </>
  );
};

export default page;