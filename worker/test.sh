#!/bin/bash
echo "=== Testing CAPI Worker via workers.dev ==="
curl -s -X POST "https://freshsoytempeh-capi.ridho90.workers.dev" \
  -H "Content-Type: application/json" \
  -d '{"event_name":"Lead","event_id":"test-1","source":"test"}'
echo ""
echo "=== Done ==="
