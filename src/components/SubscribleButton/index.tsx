 import { useSession, signIn } from 'next-auth/react'
import { api } from '../services/api'
import { getStripeJs } from '../services/stripe-js'
import style from './style.module.scss'
 
 interface SubscribleProps {
    priceId: string
 }

 export function SubscribleButton({ priceId }: SubscribleProps) {   

    const {data: session} = useSession()

    async function handleSubiscrible() {
        if(!session) {
            signIn('github')
            return;
        }

        try {
            const response = await api.post('/subscrible')

            const { sessionId } = response.data 

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({ sessionId })
        } catch(err) {
            alert(err.message)
        }
    }

    return(
        <button
            type="button"
            className={style.subscribleButton}
            onClick={handleSubiscrible}
        >
            Subscrible now
        </button>
    )
 }