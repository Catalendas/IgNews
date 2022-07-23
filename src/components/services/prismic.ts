import Prismic from '@prismicio/client'

export function getPrismicClient(req?: unknown){
    const prismic = Prismic.createClient(
        process.env.PRISMIC_ACESS_TOKEN!,
        {
            accessToken: process.env.PRISMIC_ACESS_TOKEN
        }
    )

    return prismic
}