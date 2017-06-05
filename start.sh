#!/bin/bash

trap 'terminate' INT TERM QUIT

terminate() {
    trap '' INT TERM QUIT
    echo ""
    echo "[*] Shutting down..."
    kill 0
    wait
    echo "[*] Shut down complete."
}

export NVM_DIR=$HOME/.nvm
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

nvm use 6.3

echo "[*] Starting Unichat..."
rm backend/db.sqlite3
backend/env/bin/python backend/manage.py migrate
backend/env/bin/python backend/initialize_database.py
backend/env/bin/python backend/manage.py runserver &
npm start --prefix realtime &
npm start --prefix presence &
npm start --prefix matchmaker &
npm start --prefix frontend &>/dev/null &
wait
