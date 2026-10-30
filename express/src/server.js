import express from 'express'
import { OpenStock, verifyWebhook, WebhookVerificationError } from '@openstock/node'

const openstock = new OpenStock(process.env.OPENSTOCK_SECRET_KEY)
const app = express()
const publicUrl = process.env.PUBLIC_URL ?? 'http://localhost:3000'

// The webhook route needs the raw body, so register it before express.json().
app.post('/webhooks/openstock', express.raw({ type: 'application/json' }), (req, res) => {
  let event
  try {
    event = verifyWebhook(
      req.body,
      req.header('x-webhook-signature'),
      process.env.OPENSTOCK_WEBHOOK_SECRET,
    )
  } catch (error) {
    if (error instanceof WebhookVerificationError) return res.status(400).send(error.message)
    throw error
  }

  switch (event.event) {
    case 'checkout.session.completed':
      console.log('Paid:', event.data.id, event.data.metadata)
      break
    case 'checkout.session.expired':
    case 'checkout.session.cancelled':
      console.log('Not paid:', event.data.id, event.data.status)
      break
  }
  res.sendStatus(200)
})

app.use(express.json())

app.post('/checkout', async (req, res) => {
  const session = await openstock.checkout.create({
    product_ids: [{ id: process.env.OPENSTOCK_PRODUCT_ID, quantity: 1 }],
    customer_email: req.body?.email,
    success_url: `${publicUrl}/thanks`,
    cancel_url: `${publicUrl}/`,
    webhook_url: `${publicUrl}/webhooks/openstock`,
    client_reference_id: req.body?.userId,
  })
  res.json({ url: session.url })
})

app.listen(3000, () => console.log(`Listening on ${publicUrl}`))
