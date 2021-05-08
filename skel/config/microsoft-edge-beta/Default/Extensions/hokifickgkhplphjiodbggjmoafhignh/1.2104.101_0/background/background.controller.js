!function(){"use strict";angular.module("app.background",[]).controller("BackgroundController",["$window","$http","$q","$log","constants","notification","storage","userService","editorUtils","$injector",function(e,t,n,i,r,s,a,o,l,d){a.get("webRedirect_disabled").then((function(e){Utilities.isNotUndefinedOrNull(e.webRedirect_disabled)&&e.webRedirect_disabled})),BrowserHandler.windows.onFocusChanged.addListener((function(e){g()}));const c=Date.now();var u,E=c,f=c+864e5,T=c+18e5,I=async function(e,t){const r=Date.now(),s=t.url&&t.url.startsWith("https://account.microsoft.com/");(s&&r>E||r>f||r>T)&&(n.all([l.isFeatureFlagEnabled("enableLicenseRefreshForUndef"),o.getLicenseType()]).then(e=>{const t=e[0],n=e[1];(r>f||t&&!n&&r>T)&&(f=Date.now()+864e5,T=Date.now()+18e5,o.refreshLicense().then(e=>{e&&e.refreshed&&e.data?i.info("license refreshed"):i.error("failed to refresh license"),e&&e.refreshed&&(f=Date.now()+864e5,T=Date.now()+18e5)},()=>{i.error("LicenseLongRefreshFailed")}))},()=>{i.error("Fetching license info failed.")}),s&&(i.info("BackgroundController account tab updated, refreshing license"),E=Date.now()+3e4,o.refreshLicense().then(e=>{e.refreshed&&(E=Date.now()+3e4)},()=>{i.error("LicenseShortRefreshFailed")})))};function w(){n.all([l.isFeatureFlagEnabled("enableLicenseRefresh"),o.isLoggedIn()]).then(e=>{if(!e[0]||!e[1])return i.debug("Removing refresh license listener."),void N();BrowserHandler.tabs.onUpdated.hasListener(I)||(i.debug("Enabling refresh license listener."),BrowserHandler.tabs.onUpdated.addListener(I))}).catch(e=>{i.error("Enabling license refresh failed: "+e)})}function N(){BrowserHandler.tabs.onUpdated.removeListener(I)}function g(e){var t=new Date;u?h(e,!1,t):a.get("LastSession").then((function(n){u=n&&n.LastSession&&n.LastSession.duration&&n.LastSession.startTime&&!Number.isNaN(Date.parse(n.LastSession.startTime))?n.LastSession:{startTime:new Date(t),duration:0},h(e,!0,t)}))}function h(e,t,n){u.hasOwnProperty("start_time")&&(u.startTime=u.start_time,delete u.start_time);var r=new Date(u.startTime),s=new Date(n);(e||s.setHours(0,0,0,0)!==r.setHours(0,0,0,0))&&(i.trackEvent("Session",u),u.duration=0),t&&(u.startTime=new Date(n)),u.duration+=Date.parse(n)-Date.parse(u.startTime),u.startTime=n.toString(),a.set({LastSession:u})}o.isLoggedIn().then(e=>{e?(Utilities.setIcon(r.BROWSER_ICON.DEFAULT),w()):(Utilities.setIcon(r.BROWSER_ICON.INACTIVE),N())}),BrowserHandler.storage.onChanged.addListener((function(e,t){if(Utilities.isNotUndefinedOrNull(e.webRedirect_disabled))e.webRedirect_disabled.newValue;else if(e.identity){e.identity.newValue?(w(),Utilities.setIcon(r.BROWSER_ICON.DEFAULT)):(Utilities.setIcon(r.BROWSER_ICON.INACTIVE),N())}else e.featureFlags&&w()})),BrowserHandler.runtime.onInstalled.addListener((function(e){var t=Utilities.getManifest(),n=t?t.version:-1;"install"===e.reason?(i.trackEvent("AppInstalled",{appVersion:n}),o.onInstall()):"update"===e.reason&&(i.trackEvent("AppUpdated",{appVersion:n,previousVersion:e.previousVersion}),Utilities.isNotUndefinedOrNull(window.localStorage.getItem(r.OAUTH.SERVICE_ID))&&(a.clear(),window.localStorage.clear()),a.get("userInfo").then((function(e){Utilities.isNotUndefinedOrNull(e)&&Utilities.isNotUndefinedOrNull(e.userInfo)&&(Utilities.isNotUndefinedOrNull(e.userInfo.id)||Utilities.isNotUndefinedOrNull(e.userInfo.profile))&&(a.clear(),window.localStorage.clear())})))})),BrowserHandler.runtime.onMessage.addListener((function(e,t,n){switch(e.eventId){case"telemetryEvent":case"newActivityTelemetryEvent":case"activitySetSuccessTelemetryEvent":case"activitySetResultTelemetryEvent":case"activityAddDataFieldTelemetryEvent":case"activityEndNowTelemetryEvent":return}switch(e.activity){case r.ACTIVITY.LOG.NAME:if(!Utilities.isExtensionInDevelopmentMode())break;const n=new Date;var a={};if(t.url){var o=new URL(t.url).pathname.match(/[^\\/]*($)/);o&&(a=o[0])}var l=`[${n.toLocaleString(void 0,{dateStyle:"short",timeStyle:"medium"})}] (${a}) ${e.filename?e.filename+" ":""} ${e.log}`;switch(e.severity){case"INFO":console.info(l);break;case"WARN":console.warn(l);break;case"ERROR":console.error(l);break;case"DEBUG":default:console.debug(l)}break;case r.ACTIVITY.TELEMETRY.NAME:switch(e.command){case r.TELEMETRY.COMMAND.CHANGE_TELEMETRY_VALUE:i.setEnabledSetting(e.enabled);break;case r.TELEMETRY.COMMAND.TRACK_EVENT:i.trackEvent(e.eventName,e.properties,e.measurements);break;case r.TELEMETRY.COMMAND.TRACK_TRACE:i.trackTrace(e.message,e.properties)}break;case r.ACTIVITY.NOTIFICATION.NAME:s.show(e.notification);break;case r.ACTIVITY.AUTHENTICATION.NAME:case r.ACTIVITY.AUTHORIZATION.NAME:case r.ACTIVITY.LOGOUT.NAME:case r.ACTIVITY.REQUEST_TOKEN.NAME:case r.ACTIVITY.REFRESH_ROAMING_TOKEN.NAME:return;default:{const t=new Date;return void i.warn(`[${t.toUTCString()}] Unhandled activity:${e.activity}`)}}i.debug(String.format("BackgroundController.onMessage: Processed activity {0}",e.activity))})),g(),l.addEditorPriorityListener(),l.sendEditorPrioritySignal()}])}();