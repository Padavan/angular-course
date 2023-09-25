import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { AuthService } from "./services/auth.service"
import { HttpClientModule } from "@angular/common/http"
import { SharedModule } from "@app/shared/shared.module"

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    AuthService,
    { provide: Window, useValue: window }
  ]
})
export class AuthModule { }
