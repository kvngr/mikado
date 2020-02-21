import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { User } from "./models/User";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  title = "app";

  currentUser: User;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => (this.currentUser = x));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
