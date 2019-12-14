import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "userPipe"
})
export class UserPipe implements PipeTransform {
  transform(user: string): any {
    if (!user) {
      return "Sin Usuario";
    } else {
      return user;
    }
  }
}
