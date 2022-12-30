import { useRouter } from 'next/router'
import React from 'react'

const SingleTaskId = () => {
    const router = useRouter();
    console.log(router)
    return (
        <div>SingleTaskId</div>
    )
}

export default SingleTaskId