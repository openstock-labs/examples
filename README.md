# OpenStock examples

Small working integrations for the [OpenStock](https://openstock.dev) API. Each one creates a hosted checkout from your server and verifies the signed webhook OpenStock sends when the order is paid.

- [curl](./curl): every endpoint from the command line
- [express](./express): Express server using [openstock-node](https://github.com/openstock-labs/openstock-node)
- [nextjs-app-router](./nextjs-app-router): two Next.js route handlers
- [python-flask](./python-flask): Flask with `requests` and `hmac`

The flow is the same everywhere:

1. Your server creates a checkout session with an `sk_` key.
2. The buyer pays on OpenStock's checkout with whatever methods your store has turned on.
3. OpenStock delivers the product and posts `checkout.session.completed` to your webhook URL.

API docs are at [docs.openstock.dev](https://docs.openstock.dev). MIT license.
