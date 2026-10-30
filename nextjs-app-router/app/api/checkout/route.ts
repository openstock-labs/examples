import { OpenStock } from '@openstock/node'

const openstock = new OpenStock(process.env.OPENSTOCK_SECRET_KEY!)

export async function POST(request: Request) {
  const { email } = await request.json()
  const origin = new URL(request.url).origin
  const session = await openstock.checkout.create({
    product_ids: [{ id: process.env.OPENSTOCK_PRODUCT_ID!, quantity: 1 }],
    customer_email: email,
    success_url: `${origin}/thanks`,
    cancel_url: `${origin}/`,
    webhook_url: `${origin}/api/webhooks/openstock`,
  })
  return Response.json({ url: session.url })
}
