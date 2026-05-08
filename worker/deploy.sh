#!/bin/bash
# Deploy CAPI Gateway Worker
# Usage:
#   CF_API_TOKEN=xxx META_ACCESS_TOKEN=xxx bash worker/deploy.sh
#
# Get CF_API_TOKEN from Cloudflare Dashboard → My Profile → API Tokens
# Get META_ACCESS_TOKEN from Meta Events Manager → Settings → Access Token

set -e

ACCOUNT_ID="e6d25b5f997dd2a3d48849881c4d72ad"
ZONE_ID="b03edc9d388e158772ca24870b5e0d24"
WORKER_NAME="freshsoytempeh-capi"
SCRIPT_PATH="worker/CAPI_Gateway.js"

if [ -z "$CF_API_TOKEN" ]; then
  echo "ERROR: CF_API_TOKEN env var not set"
  echo "Usage: CF_API_TOKEN=xxx META_ACCESS_TOKEN=xxx bash $0"
  exit 1
fi

if [ -z "$META_ACCESS_TOKEN" ]; then
  echo "ERROR: META_ACCESS_TOKEN env var not set"
  exit 1
fi

echo "=== Step 1: Deploy Worker Script ==="
curl -s -X PUT \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "metadata={\"main_module\":\"CAPI_Gateway.js\"};type=application/json" \
  -F "CAPI_Gateway.js=@$SCRIPT_PATH;type=application/javascript+module" \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$WORKER_NAME"

echo ""
echo "=== Step 2: Set ACCESS_TOKEN Secret ==="
curl -s -X PUT \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"type\":\"secret_text\",\"name\":\"ACCESS_TOKEN\",\"value\":\"$META_ACCESS_TOKEN\"}" \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$WORKER_NAME/secrets"

echo ""
echo "=== Step 3: Assign Route (Zone) ==="
curl -s -X POST \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"pattern\":\"capi.freshsoytempeh.nz/*\",\"script\":\"$WORKER_NAME\"}" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/workers/routes"

echo ""
echo "=== Done! ==="
