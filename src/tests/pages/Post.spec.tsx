import {render, screen} from '@testing-library/react'
import { stripe } from '../../components/services/stripe'
import Posts, { getStaticProps, } from '../../pages/posts'
import { getPrismicClient } from '../../components/services/prismic'

const posts = [
    {   slug: 'my-new-post',
        title: 'My new Post',
        excerpt: 'Post excerpt',
        updatedAt: 'March, 10'
    }
] 

jest.mock('../../components/services/prismic')

describe('Post page', () => {
    it('Renders correctly', () => {

        render(<Posts post={posts} />)

        expect(screen.getByText('My new Post')).toBeInTheDocument()
    })

    it('loads initial data', async () => {
        const getPrismicClientMocked = jest.mocked(getPrismicClient)

        getPrismicClientMocked.mockReturnValueOnce({
            query: jest.fn().mockResolvedValueOnce({
                results: [
                    {
                        uid: 'my-new-post',
                        data: {
                            title: [
                                {type: 'heading', text: 'My new post'}
                            ], 
                            conent: [
                                { type: 'paragraph', text: 'Post excerpt'}
                            ],
                        },
                        last_publication_date: '04-01-2022',
                    }
                ]
            })
        } as any )

        const response = await getStaticProps({
            previewData: undefined,
        })

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    posts: [{
                        slug: 'my-new-post',
                        title: 'My new post',
                        execerpt: 'Post excerot',
                        updatedAt: '01 de abril de 2022'
                    }]
                }
            })
        )
    })
})