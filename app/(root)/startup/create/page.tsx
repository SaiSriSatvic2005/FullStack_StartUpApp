import StartupForm from '@/components/StartupForm'
import React from 'react'
import { auth } from '@/auth'; // Adjust the import path if your auth function is elsewhere
import { redirect } from 'next/navigation';

const page = async () => {
    const session = await auth();
    if(!session) redirect('/');
  return <>
    <section className='pink_container !min-h-[230px]'>
        <h1 className='heading'>Submit Your Startup Idea</h1>
    </section>
    <StartupForm/>
  </>
}

export default page