import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { fauna } from "../../components/services/fauna";
import { query as q } from 'faunadb'
import { stripe } from "../../components/services/stripe";

type User = {
    ref: {
        id: string
    },
    data: {
        stripe_custumer_id: string
    }
}

export default async(req:NextApiRequest, res: NextApiResponse) => {
    if(req.method == 'POST') {

        const session = await getSession({ req })

        const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email)
                )
            )
        )

        let custumerId = user.data.stripe_custumer_id

        if(!custumerId) {

            const stripeCustumer = await stripe.customers.create({
                email: session.user.email
            })

            await fauna.query(
                q.Update(
                    q.Ref(q.Collection('users'), user.ref.id),
                    {
                        data: {
                            stripe_custumer_id: stripeCustumer.id
                        }
                    }
                )
            )

            custumerId = stripeCustumer.id
        }

        

        

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: custumerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { price: 'price_1LHrrQJ0SnbnbkmZElVQVW4Z', quantity: 1}
            ],
            mode: "subscription",
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUSSES_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })

        return res.status(200).json({sessionId:  stripeCheckoutSession.id})
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}