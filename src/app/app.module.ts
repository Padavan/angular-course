import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome"
import { SharedModule } from "@shared/shared.module"
import { AppComponent } from "@app/app.component"
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard"
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard"
import { AppRoutingModule } from "./app-routing.module"
import { RouterModule } from "@angular/router"
import { HttpClientModule } from "@angular/common/http"

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    SharedModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthorizedGuard, NotAuthorizedGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
