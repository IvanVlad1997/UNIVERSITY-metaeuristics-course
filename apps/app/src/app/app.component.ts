import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@metaeuristici/api-interfaces';

@Component({
  selector: 'metaeuristici-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // hello$ = this.http.get<any>('/api/problema1');
  hello$ = this.http.get<any>('/api/problema2');
  constructor(private http: HttpClient) {}
}
