import React from 'react'
import Ping from '@/components/Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queires';
import { writeClient } from '@/sanity/lib/write-client';
import { after } from 'next/server';
import { Eye } from 'lucide-react';

const View = async ({id}:{id:string}) => {
    const {views:totalViews}=await client.withConfig({useCdn:false}).fetch(STARTUP_VIEWS_QUERY,{id});
    after(async()=>await writeClient.patch(id).set({views: totalViews+1}).commit())
    return (
        <div className='view-container mr-350'>
            <div className='absolute -top-2 -right-2'>
                <Ping />
            </div>
            <p className="view-text flex items-center gap-1">
                    <Eye className="size-5" />
                    <span className='font-black'>{totalViews}</span>
            </p>
        </div>
    )
}

export default View