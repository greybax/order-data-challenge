## Order Data Client App

This is a React/Typescript Client app. I've built it for Order Data Challenge. 

I'll not share server side code here (which is based on nodejs and socket.io), but I'll share a data model which this client is working with.

## The data

The data sent by the server will consist of a list of order objects. Order objects have the following format:

```json
{
    "customer": "Carla Garner",
    "destination": "61109 Alan Motorway, North Corey, CA 92789",
    "event_name": "CREATED",
    "id": "d0791ce1",
    "item": "Caesar salad",
    "price": 4692,
    "sent_at_second": 6
}
```

## What this client is doing?

* Getting data from server in real time via socket.io
* Updates entities with same ID on the latest ones
* Converts prices from pennys to dollars in `Price` column
* Ability to search by `Price` column in USD

<img width="1345" alt="image" src="https://user-images.githubusercontent.com/3235047/177207440-1d191fa0-343f-42c3-9c24-fa3606c5a650.png">

## How to start

`npm install && npm start`


**P.S.** _feel free to reuse it as you want_
