import {Controller, Get} from '@nestjs/common';
import {Problema3Service} from "./problema3.service";

@Controller()
export class Problema3Controller {
  constructor(private readonly appService: Problema3Service) {
  }

  @Get('problema3')
  getDataProblema3(): any {
    return this.appService.getData();
  }
}
