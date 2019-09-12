---
title: "RPI garage door dotnet core CI"
date: "2018-06-10"
description: "RPI garage door dotnet core CI"
---

Continuing on my RPI garage door project, I set my Github project up with a Travis CI build step. Travis CI is a popular free CI service to all open source projects. Getting started with Travis CI is pretty easy. You create an account and then link it to your Github account.

You then pick what repo you want to build. Your repo will also need to have a .travis.yml file that will have the instructions on how to run your build. Because dotnet core has such great CLI tools, building is just like any other CI platform. Do a dotnet restore for nugets then a dotnet build or dotnet publish to build the project.

As an extra step, I have my travis file set to publish the compiled app to Github releases.

Check it out:

[https://github.com/cacodev/rpi-garage-door/blob/master/.travis.yml](https://github.com/cacodev/rpi-garage-door/blob/master/.travis.yml)

[https://travis-ci.org/cacodev/rpi-garage-door](https://travis-ci.org/cacodev/rpi-garage-door)


