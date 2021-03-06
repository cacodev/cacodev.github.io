---
title: "CSS Fun"
date: "2018-10-17"
description: "CSS Fun"
---

I'm now into making "games", well... far from it but let's just call it that because it's a lot more fun than the data centric apps I usually develop.  I wanted to illustrate how to use websockets to update a web app from either another client OR a bot/background service that is piping messaging into a MQ.  The goal is Pub/Sub all over the place.

![gif-buddy-cropped](gif-buddy-cropped.gif)

I started with a node.js app and an html/javascript front end. Since I used socket.io on my bouncy balls project, I thought "might as well use that again"! After a few modifications, I had a web app that would get a random gif from giphy.com and post it as a card. Other clients could add themselves and their gifs would show up on anyone listening to the events.

So on to the backend! I spun up a local rabbitMQ instance and set my server to consume the queues and post to the socket.io listeners whenever messages would come through that queue.

Next, I wrote a bot script to pump messages into the queue. It would run every 10 seconds, get a random gif and send the message just like another client would.

Check the code out on my git hub page: https://github.com/cacodev/gif-buddy