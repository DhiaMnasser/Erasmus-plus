
// tslint:disable:max-line-length
// >> webview-ts-events
import { Component, OnInit } from "@angular/core";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view";
import { exit } from "nativescript-exit";
import { android, AndroidApplication, AndroidActivityBundleEventData, AndroidActivityEventData } from "tns-core-modules/application";
// import * as application from "application";
import { displayedEvent, exitEvent, launchEvent, lowMemoryEvent,
    orientationChangedEvent, resumeEvent, suspendEvent, uncaughtErrorEvent,
    ApplicationEventData, LaunchEventData, OrientationChangedEventData, UnhandledErrorEventData,
    on as applicationOn, run as applicationRun } from "tns-core-modules/application";
// import { isAndroid, isIOS } from "platform";
var firebase = require("nativescript-plugin-firebase");
const dialogs = require("ui/dialogs");

@Component({
    moduleId: module.id,
    templateUrl: "./app.component.html"
})

export class AppComponent implements OnInit{


    ngOnInit() {
        firebase.init({
          // Optionally pass in properties for database, authentication and cloud messaging,
          // see their respective docs.
          showNotifications: true,
          showNotificationsWhenInForeground: true,
          onMessageReceivedCallback: function(message) {
            if(message.data !== undefined){
              let weblink = message.data.weblink;
              this.webViewSrc = weblink;
              if(this.webview != undefined){

                dialogs.confirm({
                    // title: "Push message: " + (message.title !== undefined ? message.title : ""),
                    title: "Une Nouvelle Actualite Est Ajoutee",
                    message: "y Accede?",
                    okButtonText: "OUI",
                    cancelButtonText: "NON"

                }).then(()=>{
                  this.reloadWebview();
                });
              }
            }
          }.bind(this),

        }).then(
          () => {
            console.log("firebase.init done");
          },
          error => {
            console.log(`firebase.init error: ${error}`);
          }
        );

        applicationOn(suspendEvent, (args: ApplicationEventData) => {
            if (android) {
                android.on(AndroidApplication.activityPausedEvent, function (args: AndroidActivityEventData) {
                    console.log("on suspend Event: " + args.eventName + ", Activity: " + args.activity);
                    exit();
                });
            } else{
                exit();
            }
        });

    };


    // Retrieve Firebase Messaging object.
    webViewSrc = "http://erasmusplus.tn";

    webview: WebView;

    onLoadStarted(args: LoadEventData) {
      const webView = args.object as WebView;
      this.webview = webView;
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

     reloadWebview() {
      this.webview.reload();
     };

  }



