#!/bin/bash -e

trap 'terminate' INT TERM QUIT

terminate() {
    trap '' INT TERM QUIT
    echo ""
    echo "[*] Shutting down..."
    kill 0
    wait
    echo "[*] Shut down complete."
}

NODE=~/.nvm/versions/node/v6.3.1

echo "[*] Starting Unichat..."
$NODE/bin/npm start --prefix realtime &
$NODE/bin/npm start --prefix presence &
$NODE/bin/npm start --prefix matchmaker &
$NODE/bin/npm start --prefix frontend &>/dev/null &
wait
