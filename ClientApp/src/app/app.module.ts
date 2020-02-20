import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./components/nav-menu/nav-menu.component";
import { FormMediaComponent } from "./components/form-media/form-media.component";
import { HomeComponent } from "./pages/home/home.component";
import { MediasComponent } from "./pages/medias/medias.component";
import { MediaComponent } from "./pages/media/media.component";

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "medias", component: MediasComponent },
  { path: "media/:id", component: MediaComponent },
  { path: "add-media", component: FormMediaComponent },
  { path: "media/edit/:id", component: FormMediaComponent },
  { path: "**", redirectTo: "/" }
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FormMediaComponent,
    MediasComponent,
    MediaComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
