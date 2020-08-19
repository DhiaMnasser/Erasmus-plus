
// tslint:disable:max-line-length
// >> webview-ts-events
import { Component } from "@angular/core";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view";

@Component({
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent {
    webViewSrc = "http://erasmusplus.tn";

    onLoadStarted(args: LoadEventData) {
        const webView = args.object as WebView;

        if (!args.error) {
            console.log("Load Start");
            console.log(`EventName: ${args.eventName}`);
            console.log(`NavigationType: ${args.navigationType}`);
            console.log(`Url: ${args.url}`);
        } else {
            console.log(`EventName: ${args.eventName}`);
            console.log(`Error: ${args.error}`);
        }
    }

    onLoadFinished(args: LoadEventData) {
        const webView = args.object as WebView;

        if (!args.error) {
            console.log("Load Finished");
            console.log(`EventName: ${args.eventName}`);
            console.log(`NavigationType: ${args.navigationType}`);
            console.log(`Url: ${args.url}`);
        } else {
            console.log(`EventName: ${args.eventName}`);
            console.log(`Error: ${args.error}`);
        }
    }
}
// << webview-ts-events

