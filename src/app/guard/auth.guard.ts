import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AutService } from "../service/aut.service";
import url from "src/app/config/url.config";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AutService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.estaAutenticado()) {
      return true;
    } else {
      this.router.navigateByUrl(url.salir);
      return false;
    }
  }
}
