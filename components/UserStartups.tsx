import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queires'
import React from 'react'
import { StartupCard, StartupTypeCard } from './StartupCard'

type Props = { id: string }

const UserStartups = async ({ id }: Props) => {
    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id })
    return (
        <>
            {startups.length > 0 ? (
                startups.map((startup: StartupTypeCard) => (
                    <StartupCard key={startup._id} post={startup} />
                ))
            ) : (
                <p className='no-result'>No Posts Yet</p>
            )}
        </>
    )
}

export default UserStartups