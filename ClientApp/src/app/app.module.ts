import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

import { appRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./components/nav-menu/nav-menu.component";
import { FormMediaComponent } from "./components/form-media/form-media.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { MediasComponent } from "./pages/medias/medias.component";
import { MediaComponent } from "./pages/media/media.component";

import { JwtInterceptor, ErrorInterceptor } from "./helpers";

@NgModule({
  imports: [
    appRoutingModule,
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    FormMediaComponent,
    MediasComponent,
    MediaComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
