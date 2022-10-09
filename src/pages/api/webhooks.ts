import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import { stripe } from "../../components/services/stripe";
import Stripe from "stripe";
import { saveSubscription } from "../api/_lib/manageSubscription";

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

const webhooks = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "POST") {
    const buf = await buffer(request);

    //Busca na propriedade `stripe-signature` do cabeçalho da requisição
    //O id que o stripe envia quando acessa essa rota via webhook.
    const secret = request.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        String(process.env.STRIPE_WEBHOOK_SECRET)
      );
    } catch (error) {
      return response.status(400).send(`Webhook error: ${error}`);
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case "customer.subscription.updated":
          case "customer.subscription.deleted":
            const subscription = event.data.object as Stripe.Subscription;

            await saveSubscription(
              subscription.id,
              subscription.customer.toString()
            );

            break;

          case "checkout.session.completed":
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;

            await saveSubscription(
              String(checkoutSession.subscription),
              String(checkoutSession.customer),
              true
            );
            break;

          default:
            throw new Error("Unhandled event");
        }
      } catch (error) {
        return response.json({
          error: "Webhook handler failed",
        });
      }
    }

    response.json({ received: true });
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method not allowed");
  }
};

export default webhooks;