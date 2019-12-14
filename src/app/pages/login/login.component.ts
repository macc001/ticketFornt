import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

import url from "src/app/config/url.config";

import { UsuarioModel } from "src/app/models/usuario.model";
import { AutService } from "../../service/aut.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private auth: AutService, private router: Router) {}

  ngOnInit() {
    if (this.auth.estaAutenticado()) {
      const user = localStorage.getItem("r");
      if (user === "0") {
        this.router.navigateByUrl(url.home);
      } else {
        this.router.navigateByUrl(url.admin);
      }
    }
    // console.log(this.usuario.user);
    // if (localStorage.getItem("usuario")) {
    //   this.usuario.user = localStorage.getItem("usuario");
    //   this.recordarme = true;
    // } else {
    //   if (this.auth.estaAutenticado()) {
    //     this.router.navigateByUrl("/home");
    //   }
    // }
  }
  login(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      Swal.fire({
        allowOutsideClick: false,
        type: "info",
        text: "Espere por favor..."
      });
      Swal.showLoading();
      this.auth.login(this.usuario).subscribe(resp => {
        Swal.close();
        if (this.recordarme) {
          localStorage.setItem("usuario", this.usuario.user);
          this.router.navigateByUrl(url.home);
        } else {
          if (resp["ok"]) {
            if (resp["status"][0].rol === 0) {
              this.router.navigateByUrl(url.home);
            } else {
              this.router.navigateByUrl(url.admin);
            }
          } else {
            Swal.fire({
              type: "error",
              title: "Error al autenticar"
            });
            this.router.navigateByUrl(url.salir);
          }
        }
      });
    }
  }
}
