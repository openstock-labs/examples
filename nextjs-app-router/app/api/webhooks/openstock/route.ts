import { verifyWebhook, WebhookVerificationError } from '@openstock/node'

export async function POST(request: Request) {
  // Read the raw text: re-serialized JSON would not match the signature.
  const body = await request.text()
  try {
    const event = verifyWebhook(
      body,
      request.headers.get('x-webhook-signature'),
      process.env.OPENSTOCK_WEBHOOK_SECRET!,
    )
    if (event.event === 'checkout.session.completed') {
      // Grant access, send a receipt, etc.
      console.log('Paid', event.data.id)
    }
    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      return new Response(error.message, { status: 400 })
    }
    throw error
  }
}
