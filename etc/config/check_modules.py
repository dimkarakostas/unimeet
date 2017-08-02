from subprocess import call
import os

modules = [
    'backend.unimeet.gr/api/check',
    'realtime.unimeet.gr',
    'presence.unimeet.gr',
    'matchmaker.unimeet.gr',
]

for m in modules:
    with open(os.devnull, 'w') as devnull:
        call(
            ['curl', '-m', '1', m],
            stdout=devnull,
            stderr=devnull
        )
