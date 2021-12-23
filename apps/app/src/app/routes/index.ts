import {Routes} from "@angular/router";
import {LayoutComponent} from "../layout/layout.component";
import {Problema1Component} from "../../../../../libs/problema1/src/lib/problema1/problema1.component";
import {Problema2Component} from "../../../../../libs/problema2/src/lib/problema2/problema2.component";
import {Problema3Component} from "../../../../../libs/problema3/src/lib/problema3/problema3.component";
import {StartPageComponent} from "../start-page/start-page.component";
import {Problema3HillClimbingComponent} from "../../../../../libs/problema3/src/lib/problema3-hill-climbing/problema3-hill-climbing.component";
import { Problema3IronAnnealingComponent } from "libs/problema3/src/lib/problema3-iron-annealing/problema3-iron-annealing.component";


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
      },
      {
        path: 'problema3-hill-climbing',
        component: Problema3HillClimbingComponent
      },
      {
        path: 'problema3-simulated-annealing',
        component: Problema3IronAnnealingComponent
      }
    ]
  }
]
