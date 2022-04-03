# Chat App

This is a simple chat app, to send messages between users. All the messages are stored in a database. [Link to the hosted app](https://mighty-atoll-93874.herokuapp.com/)

Currently, it does not support creation of new users. Instead, it has three pre-defined users 'Michael', 'Jim', and 'Dwight'.

## How to use:

1. Go to [mighty-atoll-93874.herokuapp.com](https://mighty-atoll-93874.herokuapp.com/).
2. Enter one of 'Michael', 'Jim', or 'Dwight' as the handle. You can use multiple sessions, each for a different username.
3. Type some messages. Since this app does not use websockets, you will have to press the reload button for new messages to appear.

## How to clone:

1. Clone the repo.
2. Create a `.env` file in the `/server` directory, with the following contents:
```
MONGO_URL = <link to a mongodb instance>
CLIENT_BASE_URL = /
```
3. To start the app, open a terminal in the `/server` directory, run `npm i`, and then `npm run dev`.
