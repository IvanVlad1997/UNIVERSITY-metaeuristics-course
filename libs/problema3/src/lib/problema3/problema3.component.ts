import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'metaeuristici-problema3',
  templateUrl: './problema3.component.html',
  styleUrls: ['./problema3.component.scss']
})
export class Problema3Component {

  constructor(private http: HttpClient) {}
  hello$ = this.http.get<any>('/api/problema3');


}
