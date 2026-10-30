# Express: checkout + verified webhooks

1. `cp .env.example .env` and fill in your secret key, webhook signing secret (dashboard → Integrations → API keys) and a product ID.
2. `npm install && npm start`
3. `curl -X POST localhost:3000/checkout -H 'content-type: application/json' -d '{"email":"jane@example.com"}'` returns a checkout URL.

To receive webhooks locally, expose port 3000 with a tunnel (for example `cloudflared tunnel --url http://localhost:3000`) and set `PUBLIC_URL` to the tunnel address.
