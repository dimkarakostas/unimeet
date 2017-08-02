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

echo "[*] Starting Unimeet..."

cd backend
if [ ! -d "env" ]; then
    virtualenv env
    env/bin/pip install -r requirements.txt
    if [ ! -e "db.sqlite3" ]; then
        rm backend/db.sqlite3
        env/bin/python manage.py migrate
        env/bin/python initialize_database.py
    fi
fi
env/bin/uwsgi --ini uwsgi.ini &
cd ..

if [ ! -d "realtime/node_modules" ]; then
    (cd realtime
    npm install)
fi
npm start --prefix realtime &

if [ ! -d "presence/node_modules" ]; then
    (cd presence
    npm install)
fi
npm start --prefix presence &

if [ ! -d "matchmaker/node_modules" ]; then
    (cd matchmaker
    npm install)
fi
npm start --prefix matchmaker &

wait
