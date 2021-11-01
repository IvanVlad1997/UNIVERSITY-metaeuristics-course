import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'metaeuristici-problema1',
  templateUrl: './problema1.component.html',
  styleUrls: ['./problema1.component.scss']
})
export class Problema1Component {

  hello$ = this.http.get<any>('/api/problema1');
  constructor(private http: HttpClient) {}



}
