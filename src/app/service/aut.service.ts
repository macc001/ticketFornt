import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { UsuarioModel } from "../models/usuario.model";
import { map } from "rxjs/operators";

import url from "src/app/config/url.config";

@Injectable({
  providedIn: "root"
})
export class AutService {
  userToken: string;

  constructor(private httpClient: HttpClient) {
    this.leerToken();
  }

  logout() {
    const idUser = localStorage.getItem("id_user");
    const json = JSON.stringify({
      idUser
    });
    const urlSalir = url.API_URI + url.cerrarSesion;
    return this.httpClient.post(urlSalir, json, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  login(usuario: UsuarioModel) {
    const json = JSON.stringify({
      user: usuario.user,
      passw: usuario.password,
      returnSecureToken: true
    });
    const urlLogin = url.API_URI + url.salir;
    return this.httpClient
      .post(urlLogin, json, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
      .pipe(
        map(resp => {
          if (resp["ok"]) {
            this.guardarToken(
              resp["status"][0].id_usuario,
              resp["status"][0].rol
            );
          }
          // console.log(resp["status"][0].ci);
          // console.log(resp);
          return resp;
        })
      );
  }

  private guardarToken(idToken: string, rol: number) {
    this.userToken = idToken;
    localStorage.setItem("id_user", idToken);
    localStorage.setItem("r", String(rol));
    const hoy = new Date();
    hoy.setSeconds(43200);
    localStorage.setItem("expira", hoy.getTime().toString());
  }

  leerToken() {
    if (localStorage.getItem("id_user")) {
      this.userToken = localStorage.getItem("id_user");
    } else {
      this.userToken = "";
    }
    return this.userToken;
  }

  estaAutenticado(): boolean {
    if (this.userToken.length < 1) {
      return false;
    }
    const expira = Number(localStorage.getItem("expira"));
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }
}
