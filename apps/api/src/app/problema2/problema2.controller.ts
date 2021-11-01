import { Controller, Get } from '@nestjs/common';
import {Problema2Service} from "./problema2.service";

@Controller()
export class Problema2Controller {
  constructor(private readonly appService: Problema2Service) {}

  @Get('problema2')
  getDataProblema2(): any {
    return this.appService.getData();
  }
}
