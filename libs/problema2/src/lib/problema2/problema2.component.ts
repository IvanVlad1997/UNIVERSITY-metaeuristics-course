import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'metaeuristici-problema2',
  templateUrl: './problema2.component.html',
  styleUrls: ['./problema2.component.scss']
})
export class Problema2Component  {

  constructor(private http: HttpClient) {}
  hello$ = this.http.get<any>('/api/problema2');


}
