---
title: "RPI Garage Door Controller using dotnet core"
date: "2018-07-29"
description: "RPI Garage Door Controller using dotnet core"
---

I’m please to say that I have my RPI garage door just about completed. I wrote the code, wired up my pins to a bread board and validated that everything works as expected. I still have some other pieces that I’d like to layer on still but this will do for now.

To recap, here’s some of the topics I covered with this project:

1. [RPI garage door project using dotnet core](/rpi-garage-door-project-using-dotnet-core/)
2. [RPI garage door dotnet core CI](/rpi-garage-door-dotnet-core-ci/)
3. Deploying to RPI from CI pipeline — Coming Soon
4. [dotnet core hosted service](/dotnet-core-hosted-service/)
5. [Getting and Setting pins for RPI using dotnet core and BIFROST](/getting-and-setting-pins-for-rpi-using-dotnet-core-and-bifrost/)
6. Leveraging Azure Event Hub and Functions to receive door open/close events — Coming Soon
7. Wiring up the circuit board — Coming Soon
8. Enabling garage controller mobile — Coming Soon

So now on to the install!

First thing, I ran my wire from the spot where I mounted the RPI to my sensors. The Sensors just attached to the rail of the garage doors like this:

![20180728_115111](/content/images/2018/08/20180728_115111.jpg)
When the door is closed, theres another piece (not pictured) to the sensor that lines up with this piece and closes the circuit. That piece came with self tapping screws that made installation super easy.

Next, mount the components to a board.

![20180728_120755](/content/images/2018/08/20180728_120755.jpg)

I took a piece of scrap 1/8 plywood that I had from another project and spray painted it.  I decided this shape/size because it fit on the inside of this clear scrap screw bin I had and it made a really nice case.

![20180728_121809](/content/images/2018/08/20180728_121809.jpg)

I only had to drill a hole in the corner to route the wires through. I also put a small screw through the side to hold it together.

Final Mount:

![20180728_121821](/content/images/2018/08/20180728_121821.jpg)

So far, I had lots of activity in my tables. Having this data now, it might be interesting to graph it out.

 


