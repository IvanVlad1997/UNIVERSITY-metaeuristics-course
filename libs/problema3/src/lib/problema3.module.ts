import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Problema3Component } from './problema3/problema3.component';
import { Problema3HillClimbingComponent } from './problema3-hill-climbing/problema3-hill-climbing.component';
import {Problema2Component} from "../../../problema2/src/lib/problema2/problema2.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    Problema3Component,
    Problema3HillClimbingComponent
  ],
  exports: [
    Problema3Component,
    Problema3HillClimbingComponent
  ]
})
export class Problema3Module {}
