import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {Problema1Module} from '@metaeuristici/problema1';
import {Problema2Module} from "@metaeuristici/problema2";
import { LayoutComponent } from './layout/layout.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {Problema3Module} from "@metaeuristici/problema3";
import { StartPageComponent } from './start-page/start-page.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent, StartPageComponent],
  imports: [BrowserModule,
    HttpClientModule,
    Problema1Module,
    Problema2Module,
    Problema3Module,
    RouterModule,
    AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
