import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'metaeuristici-problema3-hill-climbing',
  templateUrl: './problema3-hill-climbing.component.html',
  styleUrls: ['./problema3-hill-climbing.component.scss']
})
export class Problema3HillClimbingComponent {

  constructor(private http: HttpClient) {}
  hello$ = this.http.get<any>('/api/problema3-hill-climbing');



}
