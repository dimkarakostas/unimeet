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

echo "[*] Starting Unimeet..."

read -p "Have you setup Nginx? (y/n) (default: n): " ENV
ENV=${ENV:-"n"}
cd backend
if [ "$ENV" == "n" ];
then
    env/bin/python manage.py runserver &
else
    env/bin/uwsgi --ini uwsgi.ini &
fi
cd ..


export NVM_DIR=$HOME/.nvm
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

nvm use 6.3

npm start --prefix realtime &
npm start --prefix presence &
npm start --prefix matchmaker &

wait
