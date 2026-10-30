import hashlib
import hmac
import json
import os
import time

import requests
from flask import Flask, abort, jsonify, request

API = "https://openstock.dev"
SECRET_KEY = os.environ["OPENSTOCK_SECRET_KEY"]
WEBHOOK_SECRET = os.environ["OPENSTOCK_WEBHOOK_SECRET"]
TOLERANCE = 300

app = Flask(__name__)


def verify(raw_body: bytes, header: str | None) -> dict:
    """Checks x-webhook-signature: t=<unix>,v1=<hex HMAC-SHA256(secret, "t.body")>."""
    if not header:
        raise ValueError("missing signature")
    parts = [p.strip().split("=", 1) for p in header.split(",") if "=" in p]
    timestamp = next((int(v) for k, v in parts if k == "t"), None)
    signatures = [v for k, v in parts if k == "v1"]
    if timestamp is None or not signatures:
        raise ValueError("malformed signature")
    if abs(time.time() - timestamp) > TOLERANCE:
        raise ValueError("stale signature")
    signed = f"{timestamp}.".encode() + raw_body
    expected = hmac.new(WEBHOOK_SECRET.encode(), signed, hashlib.sha256).hexdigest()
    if not any(hmac.compare_digest(expected, s) for s in signatures):
        raise ValueError("bad signature")
    return json.loads(raw_body)


@app.post("/checkout")
def checkout():
    response = requests.post(
        f"{API}/api/checkout-api/sessions",
        headers={"Authorization": f"Bearer {SECRET_KEY}"},
        json={
            "product_ids": [{"id": os.environ["OPENSTOCK_PRODUCT_ID"], "quantity": 1}],
            "customer_email": (request.get_json(silent=True) or {}).get("email"),
            "success_url": request.host_url + "thanks",
            "cancel_url": request.host_url,
            "webhook_url": request.host_url + "webhooks/openstock",
        },
        timeout=30,
    )
    response.raise_for_status()
    return jsonify(url=response.json()["url"])


@app.post("/webhooks/openstock")
def webhook():
    try:
        event = verify(request.get_data(), request.headers.get("x-webhook-signature"))
    except ValueError as error:
        abort(400, str(error))
    if event["event"] == "checkout.session.completed":
        print("Paid", event["data"]["id"])
    return "", 200


if __name__ == "__main__":
    app.run(port=3000)
