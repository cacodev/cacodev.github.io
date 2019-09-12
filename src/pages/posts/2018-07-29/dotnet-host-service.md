---
title: "dotnet core hosted service"
date: "2018-07-29"
description: "dotnet core hosted service"
---

With dotnet core, traditional long running windows servers kinda went away.

But there are a few ways to do long running tasks/services in core. One way that looks favorable is to use Hosted Services in a WebAPI project. One difference with hosted services vs windows services is that theres not and hooks for when the service is installed or uninstalled.

Getting started is easy. A class/service just needs to implement the IHostedService interface. That interface requires implementation of StartAsync and StopAsync functions. These provide the hooks to start and stop the service just like the windows service.  In my RPI garage door project, I used hosted service to periodically poll my door sensor status. This service creates a timer worker and the timer worker kicks off a door check every 5 seconds. The door monitoring service just simply checks pin status and updates when status changes.
```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;

namespace rpi_garage_door.Services 
{ 
    public class SchedulerService:IHostedService, IDisposable 
    { 
        private Timer _timer; 
        private readonly ILogger _logger; 
        private readonly IDoorMonitoringService _doorMonitoringService; 

        public SchedulerService(IDoorMonitoringService doorMonitoringService, ILogger<PinService> logger) 
        { 
            _logger = logger; 
            _doorMonitoringService = doorMonitoringService;
        } 

        public Task StartAsync(CancellationToken cancellationToken) 
        { 
            _logger.LogInformation("Timed Background Service is starting."); 
            _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(5)); 
            return Task.CompletedTask; 
        } 

        private void DoWork(object state) 
        { 
            _logger.LogInformation("Running " + DateTime.Now.ToString());
            _doorMonitoringService.PerformCheck();
        } 

        public Task StopAsync(CancellationToken cancellationToken) 
        { 
            _logger.LogInformation("Timed Background Service is stopping.");
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        } 
        public void Dispose() 
        { 
            _timer?.Dispose(); 
        } 
    } 
}
```
Then service just needs to registered in the `startup.cs`:
```csharp
namespace rpi_garage_door 
{ 
    public class Startup 
    { 
        ... 
        // This method gets called by the runtime. Use this method to add services to the container. 
        public void ConfigureServices(IServiceCollection services) 
        { 
            ... 
            services.AddSingleton<IHostedService, SchedulerService>(); 
            ... 
        } 
        ... 
    } 
}
```
