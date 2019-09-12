---
title: "Getting and Setting pins for RPI using dotnet core and BIFROST"
date: "2018-07-29"
description: "Getting and Setting pins for RPI using dotnet core and BIFROST"
---

Python seems to be the language of choice for working with Raspberry Pi’s GPIO pins.  But, some of the other language like typescript/javascript and dotnet core have libraries for getting and setting pin values also. It seems that under the covers, its just looking at a directory structure and some files and values in those directories.

For my dotnet core project, I picked up a nuget package called [bifrost](https://github.com/jeremylindsayni/Bifrost) that gives me what I needed. To use this library, I made a simple “service” or “provider” that interacts with these pins:
```csharp
namespace rpi_garage_door.Services 
{ 
    public class PinService:IPinService 
    { 
        private readonly IGpioController _gpioController;
        private readonly ILogger<PinService> _logger;
        public PinService(IGpioController gpioController, ILogger<PinService> logger) 
        { 
            _logger = logger;
            _gpioController = gpioController;
        } 
        
        public int CheckPin(int pinId) 
        { 
            GpioPinValue pinStatus;
            _logger.LogInformation("About to get pin status:" + pinId);
            var pin = _gpioController.OpenPin(pinId);
            pinStatus = pin.Read();
            _logger.LogInformation("Returning pin status.");
            _logger.LogInformation(pinStatus.ToString());
            return (int)pinStatus; 
        } 
            
        public bool WritePin(int pinId, GpioPinValue pinValue) 
        { 
            var pin = _gpioController.OpenPin(pinId);
            pin.SetDriveMode(GpioPinDriveMode.Output);
            _logger.LogInformation("Writing Pin: " + pinValue);
            pin.Write(pinValue);
            return true;
        }
    } 
}
```
So for checking the value, it would return a 0 value for when the pin is in an LOW state and 1 when its in a HIGH state. In relation to my sensor, when the pin is 0, the door is open and the contact sensor is not making contact. Flip that, when the value is 1, the door is closed and the contact sensor is making contact.

Additionally, there is a function to write a value to the pin. For this project, the code would write the value to the pin to “activate” the garage door opener. When a call is made to change the garage door state, I have another service that writes the pin value to HIGH and then writes it back to LOW after 1 second.

[For more on this, take a look at the code on GitHub](https://github.com/cacodev/rpi-garage-door)
