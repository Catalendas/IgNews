import {render, screen} from '@testing-library/react'
import { stripe } from '../../components/services/stripe'
import { getStaticProps } from '../../pages/posts'
import Home from '../../pages'

jest.mock('next-auth/react', () => {
    return {
        useSession: () => [null, false]
    }
})
jest.mock('../../components/services/stripe')

describe('Home page', () => {
    it('Renders correctly', () => {


        render(<Home product={{ priceId: 'fake-price-id', amount: 'R$10,00'}} />)

        expect(screen.getByText('for R$10,00 month')).toBeInTheDocument()
    })

    it('loads initial data', async () => {
        const retriveStripeMoked = jest.mocked(stripe.prices.retrieve)

        retriveStripeMoked.mockResolvedValueOnce({
            id: 'fake-stripe-id',
            unit_amount: 1000,
        } as any )

        const response = await getStaticProps({})

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    product: {
                        priceId: 'fake-price-id',
                        amount: '$10.00'
                    }
                }
            })
        )
    })
})