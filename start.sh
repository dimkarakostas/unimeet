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

echo "[*] Starting Unichat..."
~/.nvm/v6.3.1/bin/npm start --prefix realtime &
~/.nvm/v6.3.1/bin/npm start --prefix hall &
~/.nvm/v6.3.1/bin/npm start --prefix frontend &>/dev/null &
wait
