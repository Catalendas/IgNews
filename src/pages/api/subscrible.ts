import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { stripe } from "../../components/services/stripe";

export default async(req:NextApiRequest, res: NextApiResponse) => {
    if(req.method == 'POST') {
        const sessions = await getSession({ req })

        const stripeCustumer = await stripe.customers.create({
            email: sessions.user.email
        })

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: stripeCustumer.id,
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

        return res.status(200).json({sessionsId:  stripeCheckoutSession.id})
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not Allowed')
    }
}