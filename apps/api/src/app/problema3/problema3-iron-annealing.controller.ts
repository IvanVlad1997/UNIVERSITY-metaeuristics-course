import {Controller, Get} from '@nestjs/common';
import { Problema3IronAnnealingService } from './problema3-iron-annealing.service';

@Controller()
export class Problema3IronAnnealingController  {
  constructor(private readonly appService: Problema3IronAnnealingService) {
  }

  @Get('problema3-iron-annealing')
  getDataProblema3(): any {
    return this.appService.getData();
  }
}
