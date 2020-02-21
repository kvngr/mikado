import { Routes, RouterModule } from "@angular/router";

import { FormMediaComponent } from "./components/form-media/form-media.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { MediasComponent } from "./pages/medias/medias.component";
import { MediaComponent } from "./pages/media/media.component";
import { AuthGuard } from "./helpers";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "medias", component: MediasComponent, canActivate: [AuthGuard] },
  { path: "media/:id", component: MediaComponent, canActivate: [AuthGuard] },
  {
    path: "add-media",
    component: FormMediaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "media/edit/:id",
    component: FormMediaComponent,
    canActivate: [AuthGuard]
  },
  { path: "**", redirectTo: "" }
];

export const appRoutingModule = RouterModule.forRoot(routes);
