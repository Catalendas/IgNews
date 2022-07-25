 import { useSession, signIn } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/router'
import { api } from '../services/api'
import { getStripeJs } from '../services/stripe-js'
import style from './style.module.scss'
 
 interface SubscribleProps {
    priceId: string
 }

 export function SubscribleButton({ priceId }: SubscribleProps) {   

    const {data: session} = useSession()
    const  router  = useRouter()

    async function handleSubiscrible() {
        if(!session) {
            signIn('github')
            return;
        }

        if(session.activeSubscription) {
            router.push('/posts')
            return 
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