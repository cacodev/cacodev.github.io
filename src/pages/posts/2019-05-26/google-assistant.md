---
title: "Connecting DIY smart home devices to Google Assistant"
date: "2019-05-26"
description: "Connecting DIY smart home devices to Google Assistant"
---

Last summer I started a project to monitor my garage doors. Using a Raspberry Pi, some magnetic sensors, some dotnet code and lots of time I was able to post garage open and close events to Azure (Read More).

A big piece has been missing though since I started the project. I needed an easy way of checking the status of my garage doors.

Some time has past and I've since bought into the Google Assistant ecosystem. I use the Google Home app on my phone for several smart light bulbs and I had a Google Home Hub that can do the same.

After some research, it seems that adding a device to Google Home isn't very difficult. The best place to start is here: https://developers.google.com/actions/smarthome. I'd rather not re-document Google's documentation but I'd like to add some color because I was confused about a few things.

1. What is a smart home action? I would think a smart home action is a command like "turn off the light" but the action is a higher level than that. Action is more like a connection to the Google Assistant ecosystem. You'll have a project for your action which is a way to configure how its invoked, authentication, and where to handle intents. If you plan on publishing your action, you can also specify how your action will be branded in the Google Assistant app directory.

2. Authentication required - You must set up a means of handling an OAUTH authentication for when the Smart Home action is connected to your account. Initially, I set up an Auth0 endpoint to do a simple OAUTH flow but plan to switch to use just Google's OAUTH.

3. Fulfillment - This is where the integration happens. The fulfillment URL that you put in will get called with a couple of different options. I recommend using node.js for fulfillment because you can use the actions-on-google npm package to make things easy. This library provides an easy way to code to event intents to which your code will respond with information about your smart home device. 

4. Devices and Traits - Between device types and traits you will find a way to describe your smart home device. Device types are profiles for common smart home devices that the Google Assistant ecosystem supports. With devices come traits. Traits would be properties or states of the device as if a light bulb is on or off and does that light bulb support dimming. For my garage door, I used the garage door device type which has traits of open and closed states. I can also specify open/close percentage but my garage door is not smart enough to support that.

5. Intents - intents are how Google Assistant interacts with your smart device (or smart device middleware). Currently, Google Assistant has intents for SYNC, QUERY, EXECUTE, and DISCONNECT. Sync is called to get the device info like name, type, traits. A query is called to get the state of the device. Execute is when the intent is to change the state of the device and disconnect is when the device is unregistered. More info about these intents can be found here (https://developers.google.com/actions/smarthome/develop/process-intents) 

6. Errors - Depending on your device you can report errors when an execute intent is requested. For a garage door, this might be that the garage door detects an obstruction while closing. Again, my device isn't smart enough to detect this.

Once I got past reading the documentation, I was able to integrate my garage door middleware on azure with a few hours and a couple of lines of code.
