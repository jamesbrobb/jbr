import {bootstrapApplication} from "@angular/platform-browser";
import {provideRouter, withComponentInputBinding} from "@angular/router";
import {AppComponent} from "./app/app.component";
import {getAppRoutes} from "./app/app.routes";



bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      getAppRoutes(),
      withComponentInputBinding()
    ),
  ]
})
  .catch((err) => console.error(err));
