import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { ListaModel } from "../../models/lista.models";
import { BuscarService } from "../../service/buscar.service";
import { AutService } from "../../service/aut.service";
import { Router } from "@angular/router";
import url from "src/app/config/url.config";
import { ProfModel } from "src/app/models/prof.model";
import { NgForm } from "@angular/forms";
import { BuscarModel } from "src/app/models/buscar.model";
import { CiModel } from "src/app/models/ci.mode";

declare let alertify: any;
@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"]
})
export class RegistroComponent implements OnInit {
  ci: string;
  buscar: ListaModel;
  prof: ProfModel = new ProfModel();

  buscarP: BuscarModel[] = [];
  ciP: CiModel;

  boolBuscar = true;
  boolRegist = false;
  boolEnrega = false;

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
  buscarId() {
    if (this.ci === undefined || this.ci === "") {
      return;
    } else {
      Swal.fire({
        allowOutsideClick: false,
        type: "info",
        text: "Espere por favor..."
      });
      Swal.showLoading();
      this.buscarService.listaCant(this.ci).subscribe(resp => {
        Swal.close();
        if (resp.length === 0) {
          Swal.fire({
            type: "error",
            title: "No existen datos"
          });
        }
        this.buscar = resp;
      });
    }
  }

  limpiarId() {
    this.ci = "";
    this.buscar = null;
  }

  salir() {
    this.authService.logout().subscribe(resp => {
      localStorage.removeItem("id_user");
      localStorage.removeItem("expira");
      localStorage.removeItem("r");
      this.router.navigateByUrl(url.salir);
    });
  }

  btnbuscar() {
    this.boolBuscar = true;
    this.boolRegist = false;
    this.boolEnrega = false;
  }
  btnreg() {
    this.boolBuscar = false;
    this.boolRegist = true;
    this.boolEnrega = false;
  }
  btnentregar() {
    this.boolBuscar = false;
    this.boolRegist = false;
    this.boolEnrega = true;
  }

  regProfe(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      Swal.fire({
        allowOutsideClick: false,
        type: "info",
        text: "Espere por favor..."
      });
      Swal.showLoading();
      this.buscarService.regProfesor(this.prof).subscribe(resp => {
        Swal.close();
        if (resp[0].exito === 1) {
          Swal.fire({
            allowOutsideClick: true,
            type: "success",
            text: "Datos incertados correctamentes"
          });
        } else {
          Swal.fire({
            allowOutsideClick: true,
            type: "error",
            text: "Error al insertar datos"
          });
        }
        form.reset();
      });
    }
  }

  buscarCi() {
    if (this.ciP === undefined) {
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
      this.buscarService.getTicketCi(this.ciP).subscribe(resp => {
        Swal.close();
        if (resp.length === 0) {
          Swal.fire({
            type: "error",
            title: "No existen datos"
          });
        }
        this.buscarP = resp;
      });
    }
  }
  agregarTicket(ci: string, obs: any) {
    Swal.fire({
      allowOutsideClick: false,
      type: "info",
      text: "Espere por favor..."
    });
    Swal.showLoading();
    this.buscarService.entreProfesor(ci, obs.value).subscribe(resp => {
      Swal.close();
      if (resp[0].exito === 1) {
        alertify.success("agregado exitosamente");
      } else {
        alertify.error("error!! ya fue agregado");
      }
      this.buscarCi();
    });
  }
}
