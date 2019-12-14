import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { ListaModel } from "../../models/lista.models";
import { BuscarService } from "../../service/buscar.service";
import { AutService } from "../../service/aut.service";
import { Router } from "@angular/router";
import url from "src/app/config/url.config";
import { ProfModel } from "src/app/models/prof.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"]
})
export class RegistroComponent implements OnInit {
  ci: string;
  buscar: ListaModel;
  prof: ProfModel = new ProfModel();

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
    Swal.fire({
      allowOutsideClick: false,
      type: "info",
      text: "Espere por favor..."
    });
    this.buscarService.listaCant(this.ci).subscribe(resp => {
      this.buscar = resp;
      Swal.close();
    });
  }

  salir() {
    this.authService.logout();
    this.router.navigateByUrl(url.salir);
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
        console.log(resp);
      });
    }
  }
}
