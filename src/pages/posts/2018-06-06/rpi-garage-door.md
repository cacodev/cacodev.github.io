---
title: "RPI garage door project using dotnet core"
date: "2018-06-06"
description: "RPI garage door project using dotnet core"
---

Ever left your garage door open? It sucks. Even if no one takes anything, you’re still paranoid for days. I’ve done it way too many times and so I wanted a solution.  I could have bought a new opener that had the mobile controls but my opener is just fine and it’s an “opportunity “ to do some IoT stuff.

So here’s my plan: setup raspberry pi and connect sensors to it.  Then post that data to Azure and keep a log of open and closures

Phase 2 will be to connect it to the opener and allow for cloud open and close.

Phase 3 will be to setup a phone app of some sorts to connect to the data and the service

Here’s the sensors I’m using: [https://amzn.to/2suyLCC](https://amzn.to/2suyLCC)

I’m going to be running dotnet core web api on the raspberry pi to perform these operations.

Follow this project on GitHub: [https://github.com/cacodev/rpi-garage-door](https://github.com/cacodev/rpi-garage-door)

More to come!


