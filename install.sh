#!/bin/bash

echo "[*] Installing Unimeet..."

cd backend
if [ ! -d "env" ]; then
    virtualenv env
    env/bin/pip install -r requirements.txt
fi
if [ ! -e "db.sqlite3" ]; then
    rm backend/db.sqlite3
    env/bin/python manage.py migrate
    env/bin/python initialize_database.py
fi
cd ..

export NVM_DIR=$HOME/.nvm
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

nvm use 6.3

if [ ! -d "realtime/node_modules" ]; then
    (cd realtime
    npm install)
fi

if [ ! -d "presence/node_modules" ]; then
    (cd presence
    npm install)
fi

if [ ! -d "matchmaker/node_modules" ]; then
    (cd matchmaker
    npm install)
fi

if [ ! -d "frontend/node_modules" ]; then
    (cd frontend
    npm install)
fi

if [ ! -d "frontend/build" ]; then
    (cd frontend
    npm run build)
fi
