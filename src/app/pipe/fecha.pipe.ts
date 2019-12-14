import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "fechaPipe"
})
export class FechaPipe implements PipeTransform {
  transform(user: string): any {
    if (!user) {
      return "Sin Fecha";
    } else {
      return user;
    }
  }
}
