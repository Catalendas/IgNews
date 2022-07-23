import Prismic from '@prismicio/client'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getPrismicClient } from '../../components/services/prismic'
import style from './style.module.scss'

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | ignews</title>
            </Head>

            <main className={style.container}>
                <div className={style.postList}>
                    <a href='#'>
                        <time>12 de março de 2021</time>
                        <strong>Titulo do post</strong>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo adipisci doloremque quae. Voluptatibus dolore minima id! Deserunt ipsam, minus optio, consequuntur, officiis odio debitis in eum commodi est voluptate at?</p>
                    </a>

                    <a href='#'>
                        <time>12 de março de 2021</time>
                        <strong>Titulo do post</strong>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo adipisci doloremque quae. Voluptatibus dolore minima id! Deserunt ipsam, minus optio, consequuntur, officiis odio debitis in eum commodi est voluptate at?</p>
                    </a>

                    <a href='#'>
                        <time>12 de março de 2021</time>
                        <strong>Titulo do post</strong>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo adipisci doloremque quae. Voluptatibus dolore minima id! Deserunt ipsam, minus optio, consequuntur, officiis odio debitis in eum commodi est voluptate at?</p>
                    </a>
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ()=> {
    const prismic = getPrismicClient()

    const response = await prismic.getByType(
        Prismic.predicates.at('document.type', 'Post')
    , {
        fetch: ['Post.title', 'Post.content'],
        pageSize: 100,
    })

    console.log(response)

    return {
        props: {}
    }
}

