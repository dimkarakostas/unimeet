from subprocess import call
import os

modules = [
    'backend.unimeet.eu/api/check',
    'realtime.unimeet.eu',
    'presence.unimeet.eu',
    'matchmaker.unimeet.eu',
]

for m in modules:
    with open(os.devnull, 'w') as devnull:
        call(
            ['curl', '-m', '1', m],
            stdout=devnull,
            stderr=devnull
        )
