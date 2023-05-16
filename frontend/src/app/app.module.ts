import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from "./shared/layout/layout.component";
import {HeaderComponent} from "./shared/layout/header/header.component";
import {FooterComponent} from "./shared/layout/footer/footer.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CarouselModule} from "ngx-owl-carousel-o";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {MainComponent} from './views/main/main.component';
import {AuthInterceptor} from "./core/auth/auth.interceptor";
import {MatDialogModule} from "@angular/material/dialog";
import {SharedModule} from "./shared/shared.module";
import {IConfig, NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask} from "ngx-mask";

const  maskConfigFunction : ( )  =>  Partial < IConfig >  =  ( )  =>  {
  return  {
    validation : false ,
  } ;
} ;

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    NgxMaskDirective, NgxMaskPipe,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideEnvironmentNgxMask(maskConfigFunction),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
