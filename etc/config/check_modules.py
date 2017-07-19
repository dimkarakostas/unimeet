from subprocess import call
import os

modules = [
    'backend.unichat.eu',
    'realtime.unichat.eu',
    'presence.unichat.eu',
    'matchmaker.unichat.eu',
]

for m in modules:
    with open(os.devnull, 'w') as devnull:
        call(
            ['curl', '-m', '1', m],
            stdout=devnull,
            stderr=devnull
        )
