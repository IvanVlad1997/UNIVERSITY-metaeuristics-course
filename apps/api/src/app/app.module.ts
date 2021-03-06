import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {Problema2Controller} from "./problema2/problema2.controller";
import {Problema2Service} from "./problema2/problema2.service";
import {Problema1Service} from "./problema1/problema1.service";
import {Problema1Controller} from "./problema1/problema1.controller";
import {Problema3Controller} from "./problema3/problema3.controller";
import {Problema3Service} from "./problema3/problema3.service";
import {Problema3HillClimbingController} from "./problema3/problema3-hill-climbing.controller";
import {Problema3HillClimbingService} from "./problema3/problema3-hill-climbing.service";
import { Problema3IronAnnealingController } from './problema3/problema3-iron-annealing.controller';
import { Problema3IronAnnealingService } from './problema3/problema3-iron-annealing.service';

@Module({
  imports: [],
  controllers: [AppController,
    Problema2Controller,
    Problema1Controller,
    Problema3Controller,
    Problema3HillClimbingController,
    Problema3IronAnnealingController],
  providers: [AppService,
    Problema2Service,
    Problema1Service,
    Problema3Service,
    Problema3HillClimbingService,
    Problema3IronAnnealingService],
})
export class AppModule {
}
