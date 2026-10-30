# OpenStock API with cURL

Set your secret key once:

```bash
export OPENSTOCK_SECRET_KEY=sk_...
```

## Create a checkout session

```bash
curl https://openstock.dev/api/checkout-api/sessions \
  -H "Authorization: Bearer $OPENSTOCK_SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "line_items": [{ "name": "Premium License", "price": 29.99, "quantity": 1 }],
    "customer_email": "jane@example.com",
    "success_url": "https://example.com/thanks",
    "cancel_url": "https://example.com/cart",
    "webhook_url": "https://example.com/webhooks/openstock",
    "expires_in_seconds": 1800,
    "metadata": { "orderNumber": "ORD-4821" }
  }'
```

The response contains `url`. Redirect your customer there.

## List completed sessions

```bash
curl "https://openstock.dev/api/checkout-api/sessions?status=completed&limit=20" \
  -H "Authorization: Bearer $OPENSTOCK_SECRET_KEY"
```

## Check crypto wallet balances

```bash
curl https://openstock.dev/api/withdrawal-api/wallets \
  -H "Authorization: Bearer $OPENSTOCK_SECRET_KEY"
```

## Credit a customer's store balance

```bash
curl https://openstock.dev/api/customer-balance-api/customers/add-balance \
  -H "Authorization: Bearer $OPENSTOCK_SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "email": "jane@example.com", "amount": 10, "reason": "Referral reward" }'
```

## Verify a webhook signature by hand

```bash
# header: x-webhook-signature: t=1767225600,v1=<hex>
printf '%s.%s' "$T" "$RAW_BODY" | openssl dgst -sha256 -hmac "$OPENSTOCK_WEBHOOK_SECRET" -hex
```

The output must equal one of the `v1` values in the header.
