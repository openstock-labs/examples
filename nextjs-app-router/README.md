# Next.js App Router

Two route handlers you can drop into any Next.js app:

- `app/api/checkout/route.ts` creates a checkout session and returns its URL.
- `app/api/webhooks/openstock/route.ts` verifies and handles OpenStock webhooks.

```bash
npm install github:openstock-labs/openstock-node
```

Set `OPENSTOCK_SECRET_KEY`, `OPENSTOCK_WEBHOOK_SECRET` and `OPENSTOCK_PRODUCT_ID` in `.env.local`. Both handlers run on the Node.js runtime (the default).
