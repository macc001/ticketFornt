import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CiModel } from "../models/ci.mode";
import url from "src/app/config/url.config";
import { Observable } from "rxjs";
import { ProfModel } from "../models/prof.model";

@Injectable({
  providedIn: "root"
})
export class BuscarService {
  constructor(private httpClient: HttpClient) {}

  getTicketCi(ci: CiModel): Observable<any> {
    const json = JSON.stringify({ ci });
    // console.log(json);
    // const headers = new HttpHeaders().set("Content-Type", "application/json");
    // console.log(this.httpClient.post(this.API_URI_LOCAL, json));
    const urlGetTicket = url.API_URI + url.getTicketCi;
    return this.httpClient.post(urlGetTicket, json, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  agregarTicketCi(iduser: string, idticket: string): Observable<any> {
    const json = JSON.stringify({
      id_user: iduser,
      id_ticket: idticket
    });
    const urlAgregarTicketCi = url.API_URI + url.agregarTicketCi;
    return this.httpClient.post(urlAgregarTicketCi, json, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  listaCant(iduser: string): Observable<any> {
    const json = JSON.stringify({
      id_user: iduser
    });
    const urlListaCant = url.API_URI + url.listaCant;
    return this.httpClient.post(urlListaCant, json, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  regProfesor(usuario: ProfModel): Observable<any> {
    const json = JSON.stringify({
      item: usuario.item,
      ci: usuario.ci,
      nombre: usuario.nombre,
      sie: usuario.sie,
      colegio: usuario.colegio,
      distrito: usuario.distrito
    });
    const urlListaCant = url.API_URI + url.regProf;
    return this.httpClient.post(urlListaCant, json, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  entreProfesor(ci: string, observacion: string): Observable<any> {
    const json = JSON.stringify({
      ci,
      observacion,
      id_user: localStorage.getItem("id_user")
    });
    const urlListaCant = url.API_URI + url.entreProfe;
    return this.httpClient.post(urlListaCant, json, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  cerrarSesion(): Observable<any> {
    const json = JSON.stringify({
      id_user: localStorage.getItem("id_user")
    });
    const urlListaCant = url.API_URI + url.cerrarSesion;
    return this.httpClient.post(urlListaCant, json, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
