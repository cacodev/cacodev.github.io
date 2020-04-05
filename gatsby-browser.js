import "./src/styles/global.css"
require("prismjs/themes/prism-solarizedlight.css")

// export const onServiceWorkerUpdateReady = () => {
// console.log(
//   "onServiceWorkerUpdateReady hook triggered: force reloading page."
// )
// window.location.reload(true)
// }

let injectedScript = false;

export const onInitialClientRender = () => {
    function addJS(jsCode) {
        var s = document.createElement(`script`);
        s.type = `text/javascript`;
        s.innerText = jsCode;
        document.getElementsByTagName(`head`)[0].appendChild(s);
    }
    if (!injectedScript) {
        addJS(`
        var sdkInstance="appInsightsSDK";window[sdkInstance]="appInsights";var aiName=window[sdkInstance],aisdk=window[aiName]||function(e){function n(e){t[e]=function(){var n=arguments;t.queue.push(function(){t[e].apply(t,n)})}}var t={config:e};t.initialize=!0;var i=document,a=window;setTimeout(function(){var n=i.createElement("script");n.src=e.url||"https://az416426.vo.msecnd.net/scripts/b/ai.2.min.js",i.getElementsByTagName("script")[0].parentNode.appendChild(n)});try{t.cookie=i.cookie}catch(e){}t.queue=[],t.version=2;for(var r=["Event","PageView","Exception","Trace","DependencyData","Metric","PageViewPerformance"];r.length;)n("track"+r.pop());n("startTrackPage"),n("stopTrackPage");var s="Track"+r[0];if(n("start"+s),n("stop"+s),n("setAuthenticatedUserContext"),n("clearAuthenticatedUserContext"),n("flush"),!(!0===e.disableExceptionTracking||e.extensionConfig&&e.extensionConfig.ApplicationInsightsAnalytics&&!0===e.extensionConfig.ApplicationInsightsAnalytics.disableExceptionTracking)){n("_"+(r="onerror"));var o=a[r];a[r]=function(e,n,i,a,s){var c=o&&o(e,n,i,a,s);return!0!==c&&t["_"+r]({message:e,url:n,lineNumber:i,columnNumber:a,error:s}),c},e.autoExceptionInstrumented=!0}return t}(
            {
              instrumentationKey:"890acd0f-3a5c-4d07-9b70-0a2d94a16c52"
            }
            );window[aiName]=aisdk,aisdk.queue&&0===aisdk.queue.length&&aisdk.trackPageView({});
        `);
        injectedScript = true;
    }
}

export const onRouteUpdate = ({ location, prevLocation }) => {
    if (window.appInsights) {
        const routeName = location.pathname ?? '/';
        window.appInsights.trackPageView({ name: routeName, url: location.href });
    }
    
}