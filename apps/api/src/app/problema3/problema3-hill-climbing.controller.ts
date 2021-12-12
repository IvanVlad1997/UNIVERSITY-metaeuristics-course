import {Controller, Get} from "@nestjs/common";
import {Problema3HillClimbingService} from "./problema3-hill-climbing.service";

@Controller()
export class Problema3HillClimbingController {
  constructor(private readonly appService: Problema3HillClimbingService) {
  }

  @Get('problema3-hill-climbing')
  getDataProblema3HillClimbing(): any {
    return this.appService.getData();
  }
}
