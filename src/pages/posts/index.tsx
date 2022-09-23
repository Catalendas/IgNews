import Prismic from '@prismicio/client'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getPrismicClient } from '../../components/services/prismic'
import { RichText } from 'prismic-dom'
import style from './style.module.scss'
import Link from 'next/link'

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string
}

interface PostProps {
    post: Post[]
}

export default function Posts({ post }: PostProps) {
    return (
        <>
            <Head>
                <title>Posts | ignews</title>
            </Head>

            <main className={style.container}>
                <div className={style.postList}>
                    { post.map( post => (
                        <Link key={post.slug} href={`/posts/${post.slug}`}>
                            <a>
                                <time>{post.updatedAt}</time>
                                <strong>{post.title}</strong>
                                <p>{post.excerpt}</p>
                            </a>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.getByType('post')

    const post = response.results.map( post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type == 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    return {
        props: {
            post
        }
    }
}

