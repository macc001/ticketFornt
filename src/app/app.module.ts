import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app.routing";
import { PipesModule } from "./pipe/pipes.module";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegistroComponent } from "./pages/registro/registro.component";
import { HomeComponent } from "./pages/home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
