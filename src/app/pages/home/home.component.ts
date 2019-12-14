import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BuscarService } from "src/app/service/buscar.service";
import { BuscarModel } from "src/app/models/buscar.model";
import { CiModel } from "src/app/models/ci.mode";
import Swal from "sweetalert2";
import { AutService } from "../../service/aut.service";

import url from "src/app/config/url.config";

declare let alertify: any;
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  buscar: BuscarModel[] = [];
  ci: CiModel;
  color = true;
  // verde cuando no se entrego
  // rojo cuando se entrego
  constructor(
    private buscarService: BuscarService,
    private authService: AutService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.estaAutenticado()) {
      const user = localStorage.getItem("r");
      if (user === "0") {
        this.router.navigateByUrl(url.home);
      } else {
        this.router.navigateByUrl(url.admin);
      }
    }
  }
  buscarCi() {
    if (this.ci === undefined) {
      Swal.fire({
        allowOutsideClick: false,
        type: "error",
        text: "debe introducir un ci corecto"
      });
    } else {
      Swal.fire({
        allowOutsideClick: false,
        type: "info",
        text: "Espere por favor..."
      });
      Swal.showLoading();
      this.buscarService.getTicketCi(this.ci).subscribe(resp => {
        this.buscar = resp;
        Swal.close();
      });
    }
  }
  agregarTicket(idticket: string) {
    Swal.fire({
      allowOutsideClick: false,
      type: "info",
      text: "Espere por favor..."
    });
    Swal.showLoading();
    this.buscarService
      .agregarTicketCi(localStorage.getItem("id_user"), idticket)
      .subscribe(resp => {
        // this.buscar = resp;
        // console.log(resp["ok"]);
        // console.log(resp);
        Swal.close();
        if (resp["ok"]) {
          alertify.success("agregado exitosamente");
        } else {
          alertify.error("error!! ya fue agregado");
        }
        this.buscarCi();
      });
  }
  salir() {
    this.authService.logout();
    this.router.navigateByUrl(url.salir);
    // console.log("hola");
    // console.log(this.authService.estaAutenticado());
  }
}
