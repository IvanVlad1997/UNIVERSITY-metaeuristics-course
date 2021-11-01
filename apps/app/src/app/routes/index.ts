import {Routes} from "@angular/router";
import {LayoutComponent} from "../layout/layout.component";
import {Problema1Component} from "../../../../../libs/problema1/src/lib/problema1/problema1.component";
import {Problema2Component} from "../../../../../libs/problema2/src/lib/problema2/problema2.component";
import {Problema3Component} from "../../../../../libs/problema3/src/lib/problema3/problema3.component";
import {StartPageComponent} from "../start-page/start-page.component";


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: StartPageComponent
      },
      {
        path: 'problema1',
        component: Problema1Component,
      },
      {
       path: 'problema2',
       component: Problema2Component
      },
      {
        path: 'problema3',
        component: Problema3Component
      }
    ]
  }
]
