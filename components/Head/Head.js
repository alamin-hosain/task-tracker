import React from 'react'
import Head from 'next/head';

const HeadInfo = ({ title, description, keywords }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keyword" content={keywords} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name='robots' content='index, follow' />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

export default HeadInfo