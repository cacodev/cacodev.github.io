---
title: "Exclude URLs from Azure Application Insights"
date: "2019-05-20"
description: "Exclude URLs from Azure Application Insights"
---

I started to use Azure's Application Insights because Visual Studio suggested that I do so and I can say that I like it. It gives A LOT of details for ASP.Net sites. I've used Fabric for my mobile apps and I don't think that Fabric comes close to the level of detail you can get from App Insights.

Then, I maxed out my data.  I'm using my MSDN credits for anything azure at the moment since I don't have a company sponsored azure account yet.  Doesn't look like you can bump up your data cap either on the MSDN credit plan so I had 2 options:

Use Sampling to change my feed from a stream as powerful as a fire hose to a slow leaky garden hose stream
Filter out the calls that are pushing my data caps

The second option was really the best option because I found that the internal load balancer monitoring was causing my App Insights data cap to be reached within an hour.

On this asp.net core app, I have an API endpoint that returns some basic JSON on whether the app is active or not. The load balancer monitors this and removes the node from the pool if it returns something not expected. Like I said earlier, the load balancer makes a request to that API endpoint like every 5 seconds so reporting on that is pretty much useless so I wanted to filter that out. I also wanted to exclude any requests made to my swagger & hangfire endpoints since those are utilities that the users of the app wouldn't use or see.

So my goal was to exclude any requests made to a certain URL to the request reporting in app insights. Here's the steps I took:

Create an ITelemetryProcessor class - This provides the method to filter

```
using Microsoft.ApplicationInsights.Channel;
using Microsoft.ApplicationInsights.DataContracts;
using Microsoft.ApplicationInsights.Extensibility;
using System.Linq;

namespace MyAspApp
{
    public class TelemetryProcessor : ITelemetryProcessor
    {
        private ITelemetryProcessor Next { get; set; }

        // Link processors to each other in a chain.
        public TelemetryProcessor(ITelemetryProcessor next)
        {
            this.Next = next;
        }
        public void Process(ITelemetry item)
        {
            // To filter out an item, just return
            if (!OKtoSend(item)) { return; }

            this.Next.Process(item);
        }
        private bool OKtoSend(ITelemetry item)
        {
            // info/status is my monitoring endpoint
            // swagger and hangfire are admin utils
            var namesToExclude = new string[] { "info/status", "swagger", "hangfire" };
            if (item is RequestTelemetry)
            {
                
                var request = item as RequestTelemetry;
                if (namesToExclude.Any(n => request.Name.ToLower().Contains(n))) return false;
            }
            else if (item is DependencyTelemetry)
            {
                var dep = item as DependencyTelemetry;

                if (namesToExclude.Any(n => dep.Name.ToLower().Contains(n))) return false;
            }

            // default path
            return true;

        }
    }
}
```

Register the telemetry processor in Startup.cs

```
public Startup(IHostingEnvironment env)
{
    // Do startup stuff not shown here

    // Use the Telemetry Processor
    var b = TelemetryConfiguration.Active.TelemetryProcessorChainBuilder;
    b.Use((next) => new TelemetryProcessor(next));
    b.Build();
}
```