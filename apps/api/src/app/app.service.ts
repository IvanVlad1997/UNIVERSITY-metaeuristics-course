import {Injectable} from '@nestjs/common';

interface Cromozon {
  g0: number;
  g1: number;
  g2: number;
  g3: number;
  g4: number;
  g5: number;
  g6: number;
  g7: number;
  fitness: number;
}

interface Generatie {
  indivizi: Cromozon[];
  parinti: Cromozon[];
  fitnessMaxim: number;
}

interface UtilajeAG {
  populatie: Cromozon[];
  probabilitateaDeIncrucisare: number;
  probabilitateaDeMutatie: number;
  dimensiuneaInitialaPopulatie: number;
  numarulMaximDeGeneratii: number;
  dimensiuneaMaximaPopulatie: number
  costuri: number[];
  profit: number[];
  generatieActuala: number;
  populatieActuala: number;
  generatii: Generatie[];
}


@Injectable()
export class AppService {

  private utilajeAG: UtilajeAG;


  citireDateIntrare() {
    this.utilajeAG.costuri = [57, 82, 75, 45, 28, 111, 44, 9];
    this.utilajeAG.profit = [18, 15, 98, 75, 100, 57, 57, 18]
  }

  citireParametri() {
    this.utilajeAG.dimensiuneaInitialaPopulatie = 5;
    this.utilajeAG.numarulMaximDeGeneratii = 6;
    this.utilajeAG.dimensiuneaMaximaPopulatie = 250;
    this.utilajeAG.probabilitateaDeIncrucisare = 0.7;
    this.utilajeAG.probabilitateaDeMutatie = 0.1;
  }

  adaugareIndivid() {
    let individ: Cromozon = {fitness: undefined, g0: 0, g1: 0, g2: 0, g3: 0, g4: 0, g5: 0, g6: 0, g7: 0};
    this.utilajeAG.populatie.push(individ);
    this.utilajeAG.populatieActuala++;
  }


  getGena(individ: Cromozon, index: number) {
    let gena: number;
    switch (index) {
      case 0:
        gena = individ.g0;
        break;
      case 1:
        gena = individ.g1;
        break;
      case 2:
        gena = individ.g2;
        break;
      case 3:
        gena = individ.g3;
        break;
      case 4:
        gena = individ.g4;
        break;
      case 5:
        gena = individ.g5;
        break;
      case 6:
        gena = individ.g6;
        break;
      case 7:
        gena = individ.g7;
        break;
    }
    return gena;
  }

  setGena(individ: Cromozon, index: number, valoareNoua: number) {
    switch (index) {
      case 0:
        individ.g0 = valoareNoua;
        break;
      case 1:
        individ.g1 = valoareNoua;
        break;
      case 2:
        individ.g2 = valoareNoua;
        break;
      case 3:
        individ.g3 = valoareNoua;
        break;
      case 4:
        individ.g4 = valoareNoua;
        break;
      case 5:
        individ.g5 = valoareNoua;
        break;
      case 6:
        individ.g6 = valoareNoua;
        break;
      case 7:
        individ.g7 = valoareNoua;
        break;
    }
  }


  initializarePopulatie(dimensiuneInitiala: number) {
    for (let indexIndivid = 0; indexIndivid < dimensiuneInitiala; indexIndivid++) {
      this.adaugareIndivid();
      for (let indexGena = 0; indexGena < 8; indexGena++) {
        if (Math.random() < .5) {
          this.setGena(this.utilajeAG.populatie[indexIndivid], indexGena, 0);
          continue;
        }
        this.setGena(this.utilajeAG.populatie[indexIndivid], indexGena, 1);
      }
      this.utilajeAG.populatie[indexIndivid].fitness = this.fitness(this.utilajeAG.populatie[indexIndivid]);
    }
  }

  fitness(individ: Cromozon) {
    let fitness: number = 0;
    for (let gena = 0; gena < 8; gena++) {
      fitness = fitness + this.getGena(individ, gena) * (this.utilajeAG.profit[gena] - this.utilajeAG.costuri[gena])
    }
    return fitness;
  }

//Metode Generatii
  adaugareGeneratie(problema: UtilajeAG) {
    let generatie: Generatie = {fitnessMaxim: 0, indivizi: [], parinti: []};
    generatie.indivizi = [...problema.populatie];
    problema.generatii.push(generatie);
  }

  adaugarePopulatieLaGeneratie(problema: UtilajeAG): void {
    problema.generatii[problema.generatieActuala].indivizi = [...problema.populatie];
  }

  evaluareFitnessMaximGeneratie(problema: UtilajeAG) {
    let fitnessMaxim: number = problema.generatii[problema.generatieActuala].indivizi[0].fitness;
    for (let individ of problema.generatii[problema.generatieActuala].indivizi) {
      if (individ.fitness > fitnessMaxim) {
        fitnessMaxim = individ.fitness
      }
    }
    problema.generatii[problema.generatieActuala].fitnessMaxim = fitnessMaxim;
  }

  trecereLaGeneratiaUrmatoare(problema: UtilajeAG) {
    problema.generatieActuala++;
    // this.utilajeAG.generatii[problema.generatieActuala] = {
    //   fitnessMaxim: 0, indivizi: [], parinti: []
    // }
  }


  selectieElitista() {
    let numarParinti = Math.floor(this.utilajeAG.probabilitateaDeIncrucisare * this.utilajeAG.populatieActuala);
    if (numarParinti % 2 === 1) {
      numarParinti--;
    }
    let sorted = [...this.utilajeAG.populatie]
      .sort((a, b) => (a.fitness < b.fitness) ? 1 : ((b.fitness < a.fitness) ? -1 : 0));
    for (let i = 0; i < numarParinti; i++) {
      this.utilajeAG.generatii[this.utilajeAG.generatieActuala].parinti[i] = sorted[i];
    }
  }


  initializareDescendent(indiceParinte1: number, indiceParinte2: number, pozitieIncrucisare: number, numarDescendent: number) {
    let parinti = [...this.utilajeAG.generatii[this.utilajeAG.generatieActuala].parinti];
    let parinte1: Cromozon = parinti[indiceParinte1];
    let parinte2: Cromozon = parinti[indiceParinte2];
    let descendent: Cromozon = {fitness: undefined, g0: 0, g1: 0, g2: 0, g3: 0, g4: 0, g5: 0, g6: 0, g7: 0};


    if (numarDescendent === 0) {
      for (let i = 0; i < pozitieIncrucisare; i++) {
        this.setGena(descendent, i, this.getGena(parinte1, i));
      }
      for (let i = pozitieIncrucisare; i < 8; i++) {
        this.setGena(descendent, i, this.getGena(parinte2, i));
      }
    }
    if (numarDescendent === 1) {
      for (let i = 0; i < pozitieIncrucisare; i++) {
        this.setGena(descendent, i, this.getGena(parinte2, i));
      }
      for (let i = pozitieIncrucisare; i < 8; i++) {
        this.setGena(descendent, i, this.getGena(parinte1, i));
      }
    }
    descendent.fitness = this.fitness(descendent)
    this.utilajeAG.populatie.push(descendent);
    this.utilajeAG.populatieActuala++;
  }

  incrucisare() {
    let lungimeListaParinti = this.utilajeAG.generatii[this.utilajeAG.generatieActuala].parinti.length;
    for (let i = 0; i < lungimeListaParinti / 2; i++) {
      this.initializareDescendent(i, lungimeListaParinti - i - 1, 3, 0)
      this.initializareDescendent(i, lungimeListaParinti - i - 1, 3, 1)
    }
  }

  mutatie() {
    let mutanti: number = Math.floor(this.utilajeAG.populatieActuala * this.utilajeAG.probabilitateaDeMutatie);
    for (let i = 0; i < mutanti; i++) {
      let individulMutant: number = this.getRandomInt(this.utilajeAG.populatieActuala + 1);
      let genaMutanta: number = this.getRandomInt(7 + 1);
      if (this.utilajeAG.populatie[individulMutant]) {
        if (this.getGena(this.utilajeAG.populatie[individulMutant], genaMutanta) === 0) {
          this.setGena(this.utilajeAG.populatie[individulMutant], genaMutanta, 1);
        } else {
          this.setGena(this.utilajeAG.populatie[individulMutant], genaMutanta, 0)
        }
        this.utilajeAG.populatie[individulMutant].fitness = this.fitness(this.utilajeAG.populatie[individulMutant]);
      }
    }
  }

  final(nrMaxGeneratii, populatieMaxima) {
    return ((this.utilajeAG.generatieActuala === nrMaxGeneratii) || (this.utilajeAG.populatieActuala >= populatieMaxima))
  }


  resetProblema(): UtilajeAG {
    let date: UtilajeAG = {
      generatii: [],
      costuri: [],
      dimensiuneaInitialaPopulatie: 0,
      dimensiuneaMaximaPopulatie: 0,
      generatieActuala: 0,
      numarulMaximDeGeneratii: 0,
      populatie: [],
      populatieActuala: 0,
      probabilitateaDeIncrucisare: 0,
      probabilitateaDeMutatie: 0,
      profit: []
    }
    return date;
  }

  getData(): any {
    this.utilajeAG = this.resetProblema();
    this.citireDateIntrare();
    this.citireParametri()
    this.initializarePopulatie(this.utilajeAG.dimensiuneaInitialaPopulatie);
    this.adaugareGeneratie(this.utilajeAG)
    this.adaugarePopulatieLaGeneratie(this.utilajeAG);
    this.evaluareFitnessMaximGeneratie(this.utilajeAG)
    do {
      this.trecereLaGeneratiaUrmatoare(this.utilajeAG);
      this.adaugareGeneratie(this.utilajeAG);
      this.selectieElitista();
      this.incrucisare();
      this.mutatie();
      this.adaugarePopulatieLaGeneratie(this.utilajeAG);
      this.evaluareFitnessMaximGeneratie(this.utilajeAG)
    } while (!this.final(this.utilajeAG.numarulMaximDeGeneratii, this.utilajeAG.dimensiuneaMaximaPopulatie))
    return this.utilajeAG;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}
