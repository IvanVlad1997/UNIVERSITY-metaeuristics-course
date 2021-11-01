import {Injectable} from "@nestjs/common";

interface Cromozon {
  asezariInvitatiLaMese: Masa[];
  fitnsesIndivid: number
}

interface Masa {
  asezariInvitati: number[];
  fitnessMasa: number;
}

interface Generatie {
  indivizi: Cromozon[];
  parinti: Cromozon[];
  fitnessMaximGeneratie: number;
}

interface ListaInvitatilorAG {
  populatie: Cromozon[];
  probabilitateaDeIncrucisare: number;
  probabilitateaDeMutatie: number;
  dimensiuneaInitialaPopulatie: number;
  numarulMaximDeGeneratii: number;
  dimensiuneaMaximaPopulatie: number;
  numarDeMese: number;
  numarDeInvitati: number;
  numarMaximDeLocuriMese: number[];
  generatieActuala: number;
  populatieActuala: number;
  generatii: Generatie[];
  bunaDispozitie: number[][];
}


@Injectable()
export class Problema3Service {

  private problema: ListaInvitatilorAG;

  citireDateIntrare() {
    this.problema.numarDeInvitati = 10;
    this.problema.numarDeMese = 4;
    this.problema.numarMaximDeLocuriMese = [3, 4, 6, 3]
  }

  citireParametri() {
    //Buna dispozitie

    for (let i = 0; i < this.problema.numarDeInvitati; i++) {
      this.problema.bunaDispozitie.push([0]);
      for (let j = 0; j < this.problema.numarDeInvitati; j++) {
        if (i == j) {
          this.problema.bunaDispozitie[i][j] = 100;
          continue;
        }
        this.problema.bunaDispozitie[i][j] = this.getRandomInt(100)
      }
    }
  }

  adaugareIndivid() {
    let individ: Cromozon = {asezariInvitatiLaMese: [], fitnsesIndivid: 0}
    for (let i = 0; i < this.problema.numarDeMese; i++) {
      let masa: Masa = {asezariInvitati: [], fitnessMasa: 0}
      individ.asezariInvitatiLaMese.push(masa)
    }
    this.problema.populatie.push(individ);
    this.problema.populatieActuala++;
  }

  initializarePopulatie() {
    for (let individ = 0; individ < this.problema.dimensiuneaInitialaPopulatie; individ++) {
      this.adaugareIndivid();
      for (let invitat = 0; invitat < this.problema.numarDeInvitati; invitat++) {
        let numarMasa: number;
        do {
          numarMasa = this.getRandomInt(this.problema.numarDeMese);
        } while (this.problema.populatie[individ].asezariInvitatiLaMese[numarMasa].asezariInvitati.length >=
        this.problema.numarMaximDeLocuriMese[numarMasa])
        this.problema.populatie[individ].asezariInvitatiLaMese[numarMasa].asezariInvitati.push(invitat);
      }
      for (let masa = 0; masa < this.problema.numarDeMese; masa++) {
        let fitnessMasa: number = this.fitnessMasa(this.problema.populatie[individ].asezariInvitatiLaMese[masa].asezariInvitati, this.problema.bunaDispozitie)
        console.log(fitnessMasa)
        this.problema.populatie[individ].asezariInvitatiLaMese[masa].fitnessMasa = fitnessMasa;
      }
    }
  }

  fitnessMasa(invitati: number[], bunaDispozitie: number[][]): number {
    let fitness: number = 100;
    console.log('invitati', invitati)
    console.log('invitati.length', invitati.length)
    if (invitati.length === 1) {
      return 0;
    }
    if (invitati.length === 0) {
      return 100;
    }
    for (let invitat = 0; invitat < invitati.length; invitat++) {
      if (invitat === 0) {
        if (fitness > bunaDispozitie[invitat][invitat + 1]) {
          fitness = bunaDispozitie[invitat][invitat + 1];
          console.log('bd-1', bunaDispozitie[invitat][invitat + 1])
        }
        if (fitness > bunaDispozitie[invitat][invitati.length-1]) {
          fitness = bunaDispozitie[invitat][invitati.length-1];
          console.log('bd-2', bunaDispozitie[invitat][invitat + 1])
        }
        continue
      }

      if (invitat === invitati.length - 1) {
        if (fitness > bunaDispozitie[invitat][0]) {
          fitness = bunaDispozitie[invitat][0];
          console.log('bd-3', bunaDispozitie[invitat][invitat + 1])
        }
        if (fitness > bunaDispozitie[invitat][invitat-1]) {
          fitness = bunaDispozitie[invitat][invitat-1];
          console.log('bd-4', bunaDispozitie[invitat][invitat + 1])
        }
        continue
      }

      if (fitness > bunaDispozitie[invitat][invitat + 1]) {
        fitness = bunaDispozitie[invitat][invitat + 1];
        console.log('bd-5', bunaDispozitie[invitat][invitat + 1])
      }
      if (fitness > bunaDispozitie[invitat][invitat-1]) {
        fitness = bunaDispozitie[invitat][invitat-1];
        console.log('bd-6', bunaDispozitie[invitat][invitat + 1])
      }

    }
    return fitness;
  }

  resetareProblema(): ListaInvitatilorAG {
    let date: ListaInvitatilorAG = {
      bunaDispozitie: [],
      dimensiuneaInitialaPopulatie: 5,
      dimensiuneaMaximaPopulatie: 250,
      generatieActuala: 0,
      generatii: [],
      numarDeInvitati: 9,
      numarDeMese: 0,
      numarMaximDeLocuriMese: [],
      numarulMaximDeGeneratii: 6,
      populatie: [],
      populatieActuala: 0,
      probabilitateaDeIncrucisare: 0.7,
      probabilitateaDeMutatie: 0.1
    }
    return date;
  }

  getData() {
    this.problema = this.resetareProblema();
    this.citireDateIntrare();
    this.citireParametri();
    this.initializarePopulatie()


    return this.problema;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}
