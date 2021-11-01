import { Controller, Get } from '@nestjs/common';
import {Problema1Service} from "./problema1.service";

@Controller()
export class Problema1Controller {
  constructor(private readonly appService: Problema1Service) {}

  @Get('problema1')
  getDataProblema1(): any {
    return this.appService.getData();
  }
}
