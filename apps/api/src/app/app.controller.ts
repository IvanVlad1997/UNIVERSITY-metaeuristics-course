import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('problema1')
  getDataProblema1(): any {
    return this.appService.getData();
  }

  @Get('problema2')
  getDataProblema2(): any {
    return this.appService.getData();
  }
}
