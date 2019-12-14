import { NgModule } from "@angular/core";
import { UserPipe } from "./user.pipe";
import { FechaPipe } from "./fecha.pipe";

@NgModule({
  imports: [],
  declarations: [UserPipe, FechaPipe],
  exports: [UserPipe, FechaPipe]
})
export class PipesModule {}
