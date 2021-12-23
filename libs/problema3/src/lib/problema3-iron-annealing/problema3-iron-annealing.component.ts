import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metaeuristici-problema3-iron-annealing',
  templateUrl: './problema3-iron-annealing.component.html',
  styleUrls: ['./problema3-iron-annealing.component.scss']
})
export class Problema3IronAnnealingComponent  {


  constructor(private http: HttpClient) {}
  hello$ = this.http.get<any>('/api/problema3-iron-annealing');



}
