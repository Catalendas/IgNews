import { GetStaticPaths, GetStaticProps } from "next"
import { useSession } from "next-auth/react"
import Link from 'next/link'
import Head from "next/head"
import { RichText } from "prismic-dom"
import { getPrismicClient } from "../../../components/services/prismic"
import style from '../post.module.scss'
import { useEffect } from "react"
import { useRouter } from "next/router"

interface PostPreviewProps {
    posts: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string
    }
}

export default function PostPreview({ posts }: PostPreviewProps) {
    const {data: session} = useSession()
    const router = useRouter()

    useEffect(() => {
        if(session?.activeSubscription) {
            router.push(`/posts/${posts.slug}`)
        }
    }, [session])
    
    return(
        <>
            <Head>
                <title>{posts.title} | Ignews</title>
            </Head>

            <main className={style.container}>
                <article className={style.post}>
                    <h1>{posts.title}</h1>
                    <time>{posts.updatedAt}</time>
                    <div className={`${style.postContent} ${style.previewContent}`} dangerouslySetInnerHTML={{ __html: posts.content}} />

                    <div className={style.continueReading}>
                        Wanna continue reading ? 
                        <Link href="/">
                            <a >Subscrible now 🤗</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return{
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    
    const { slug } = params

    const prismic = getPrismicClient()

    const response = await prismic.getByUID('post', String(slug), {})

    const posts = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return{
        props: {
            posts,
        },
        redirect: 60 * 30 // uma vez acada 30 minutos
    }
}