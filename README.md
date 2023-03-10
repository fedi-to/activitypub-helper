# activitypub-helper

This is a client-side-only ActivityPub helper which helps us avoid making
arbitrary HTTP requests from a server, for legal liability reasons.

TL;DR: it's not an open proxy. it can't be abused like an open proxy.

## Features

- Actually checks that the target is an ActivityPub object! No redirects to
    invite links, preferences, or other weird stuff!
- Client-side-only. No legal liability, and works on any static host.

## Contributing

This repository is licensed `MIT OR Apache-2.0`, see the two `LICENSE-*` files
for details. Also follow the code of conduct, `CODE_OF_CONDUCT.md`, when
participating in this space.
