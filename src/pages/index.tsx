import { GetStaticProps } from 'next'

import Head from 'next/head'
import { stripe } from '../components/services/stripe'
import { SubscribleButton } from '../components/SubscribleButton'

import style from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string
    amount: string
  }
}

  export default function Home({ product }: HomeProps) {
    return (
      <>
        <Head>
          <title>Home | ig.news</title>
        </Head>
        
        <main className={style.contentContainer}>
          <section className={style.hero}>
            <span>👏 Hey, welcome</span>

            <h1>News about the <span>React</span> word.</h1>

            <p>
              Get acess to al the publications <br />
              <span>for {product.amount} month</span>
            </p>

            <SubscribleButton priceId={product.priceId}/>
          </section>

          <img src="/images/avatar.svg" alt="Girl coding" />
        </main>
      </>
    )
  }

    export const getStaticProps: GetStaticProps = async() => {
      
      const price = await stripe.prices.retrieve('price_1LHrrQJ0SnbnbkmZElVQVW4Z', {
        expand: ['product']
      })

      const product = {
        priceId: price.id,
        amount: new Intl.NumberFormat('en-US',{
          style: 'currency',
          currency: 'USD'
        }).format(price.unit_amount / 100),
      };

      
        return{
          props: {
            product
          },
          revalidate: 60 * 60 * 24, // 24 hors
        }
      }


