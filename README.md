<p align="center">
  <a href="https://openstock.dev"><img src="https://openstock.dev/brand/mark.png" alt="OpenStock" width="64" height="64"></a>
</p>

<h1 align="center">OpenStock examples</h1>

<p align="center">Runnable integrations for the <a href="https://docs.openstock.dev">OpenStock API</a>.</p>

[OpenStock](https://openstock.dev) is a hosted platform for selling digital products such as license keys, files, accounts and Discord roles. These examples show how to start a hosted checkout from your own site or app and handle signed webhooks.

| Example | What it shows |
| --- | --- |
| [`curl`](./curl) | Every endpoint from the command line, plus manual signature checks |
| [`express`](./express) | Checkout endpoint and verified webhooks with the [Node.js SDK](https://github.com/openstock-labs/openstock-node) |
| [`nextjs-app-router`](./nextjs-app-router) | Drop-in route handlers for Next.js |
| [`python-flask`](./python-flask) | Checkout and webhook verification with `requests` and `hmac` |

## How it works

1. Your server creates a checkout session with a secret `sk_` key.
2. The customer pays on OpenStock's hosted checkout, using whichever methods your store has enabled (cards through your Stripe, PayPal, crypto and more).
3. OpenStock delivers the product (keys, files, Discord roles) and POSTs a signed `checkout.session.completed` webhook to your server.

## Links

- [API reference](https://docs.openstock.dev) · [OpenAPI spec](https://openstock.dev/openapi.json)
- [Node.js SDK](https://github.com/openstock-labs/openstock-node)
- [Create a store](https://openstock.dev/auth?tab=signup) · [Discord](https://discord.gg/openstock)

MIT licensed.
