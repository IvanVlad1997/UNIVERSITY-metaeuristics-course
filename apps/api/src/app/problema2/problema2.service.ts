import {Injectable} from "@nestjs/common";

//TODO: De adaugat restrictii

interface Cromozon {
  cantitatiProduse: number[];
  fitness: number;
}

interface SelectiaRuleta {
  individ: Cromozon;
  interval: number[];
  procent: number;
}

interface Generatie {
  indivizi: Cromozon[];
  parinti: Cromozon[];
  fitnessMaxim: number;
}

interface ProblemaAG {
  populatie: Cromozon[];
  probabilitateaDeIncrucisare: number;
  probabilitateaDeMutatie: number;
  dimensiuneaInitialaPopulatie: number;
  numarulMaximDeGeneratii: number;
  dimensiuneaMaximaPopulatie: number
  costuri: number[];
  venit: number[];
  cantitateMaxima: number[];
  generatieActuala: number;
  populatieActuala: number;
  generatii: Generatie[];
  numarComponente: number;
}

@Injectable()
export class Problema2Service {

  private problemaAg: ProblemaAG;

  citireDateIntrare() {
    for (let i = 0; i < this.problemaAg.numarComponente; i++) {
      this.problemaAg.costuri.push(this.getRandomInt(370))
      this.problemaAg.venit.push(this.getRandomInt(370))
      this.problemaAg.cantitateMaxima.push(this.getRandomInt(370))
    }
  }

  citireParametri() {
    this.problemaAg.dimensiuneaInitialaPopulatie = 5;
    this.problemaAg.numarulMaximDeGeneratii = 10;
    this.problemaAg.dimensiuneaMaximaPopulatie = 250;
    this.problemaAg.probabilitateaDeIncrucisare = 0.6;
    this.problemaAg.probabilitateaDeMutatie = 0.5;
    this.problemaAg.numarComponente = 3;
  }

  adaugareIndivid() {
    let individ: Cromozon = {
      cantitatiProduse: [], fitness: 0
    }
    this.problemaAg.populatie.push(individ);
    this.problemaAg.populatieActuala++;
  }

  initializarePopulatie() {
    for (let i = 0; i < this.problemaAg.dimensiuneaInitialaPopulatie; i++) {
      this.adaugareIndivid();
      for (let j = 0; j < this.problemaAg.numarComponente; j++) {
        this.problemaAg.populatie[i].cantitatiProduse[j] = this.getRandomInt(this.problemaAg.cantitateMaxima[j])
      }
      this.problemaAg.populatie[i].fitness = this.fitness(this.problemaAg.populatie[i]);
    }
  }

  //Metode Generatii
  adaugareGeneratie(problema: ProblemaAG) {
    let generatie: Generatie = {
      fitnessMaxim: 0, indivizi: [], parinti: []
    }
    generatie.indivizi = [...problema.populatie];
    problema.generatii.push(generatie);
  }

  adaugarePopulatieLaGeneratie(problema: ProblemaAG): void {
    problema.generatii[problema.generatieActuala].indivizi = [...problema.populatie];
  }

  evaluareFitnessMaximGeneratie(problema: ProblemaAG) {
    let fitnessMaxim: number = problema.generatii[problema.generatieActuala].indivizi[0].fitness;
    for (let individ of problema.generatii[problema.generatieActuala].indivizi) {
      if (individ.fitness > fitnessMaxim) {
        fitnessMaxim = individ.fitness
      }
    }
    problema.generatii[problema.generatieActuala].fitnessMaxim = fitnessMaxim;
  }

  trecereLaGeneratiaUrmatoare(problema: ProblemaAG) {
    problema.generatieActuala++;
    // this.problemaAg.generatii[problema.generatieActuala] = {
    //   fitnessMaxim: 0, indivizi: [], parinti: []
    // }
  }

  fitness(individ: Cromozon) {
    let fitness: number = 0;
    for (let i = 0; i < this.problemaAg.numarComponente; i++) {
      fitness += individ.cantitatiProduse[i] * (this.problemaAg.venit[i] - this.problemaAg.costuri[i])
    }
    return fitness;
  }

  //TODO: Simplify
  selectieRuleta(problema: ProblemaAG) {
    let copiePopulatie = [...problema.populatie]
      .sort((a, b) => (a.fitness < b.fitness) ? 1 : ((b.fitness < a.fitness) ? -1 : 0));

    let numarParinti = Math.floor(problema.probabilitateaDeIncrucisare * problema.populatieActuala);
    if (numarParinti % 2 === 1) {
      numarParinti--;
    }
    let copieNumarParinti = numarParinti;
    let selectieRuleta: SelectiaRuleta[] = [];
    while (copieNumarParinti > 0) {
      let individSelectieRuleta: SelectiaRuleta = {individ: undefined, interval: [], procent: 0};
      let sumaFitness = 0;
      for (let i = 0; i < copiePopulatie.length; i++) {
        sumaFitness += copiePopulatie[i].fitness;
      }
      let numarAleator = this.getRandomInt(99)
      let marginiInterval: number = 0;
      for (let i = 0; i < copiePopulatie.length; i++) {
        let procent: number = copiePopulatie[i].fitness / sumaFitness * 100;
        individSelectieRuleta.procent = procent;
        individSelectieRuleta.individ = copiePopulatie[i];
        individSelectieRuleta.interval = [];
        individSelectieRuleta.interval.push(marginiInterval);
        marginiInterval += procent;
        individSelectieRuleta.interval.push(marginiInterval);
        selectieRuleta.push(individSelectieRuleta);
        if (individSelectieRuleta.interval[0] < numarAleator && numarAleator < individSelectieRuleta.interval[1]) {
          problema.generatii[problema.generatieActuala].parinti.push(individSelectieRuleta.individ);
          copiePopulatie.splice(i, 1)
        }
      }
      copieNumarParinti--;
    }
  }

  initializareDescendent(indiceParinte1: number, indiceParinte2: number, pozitieIncrucisare: number, numarDescendent: number) {
    let parinti = [...this.problemaAg.generatii[this.problemaAg.generatieActuala].parinti];
    let parinte1: Cromozon = parinti[indiceParinte1];
    let parinte2: Cromozon = parinti[indiceParinte2];
    let descendet: Cromozon = {cantitatiProduse: [], fitness: 0}
    if (numarDescendent === 0) {
      for (let i = 0; i < pozitieIncrucisare; i++) {
        descendet.cantitatiProduse[i] = parinte1.cantitatiProduse[i];
      }
      for (let i = pozitieIncrucisare; i < this.problemaAg.numarComponente; i++) {
        descendet.cantitatiProduse[i] = parinte2.cantitatiProduse[i];
      }
    }
    if (numarDescendent === 1) {
      for (let i = 0; i < pozitieIncrucisare; i++) {
        descendet.cantitatiProduse[i] = parinte2.cantitatiProduse[i];
      }
      for (let i = pozitieIncrucisare; i < this.problemaAg.numarComponente; i++) {
        descendet.cantitatiProduse[i] = parinte1.cantitatiProduse[i];
      }
    }
    descendet.fitness = this.fitness(descendet);
    this.problemaAg.populatie.push(descendet);
    this.problemaAg.populatieActuala++;
  }

  incrucisare() {
    let lungimeListaParinti = this.problemaAg.generatii[this.problemaAg.generatieActuala].parinti.length;
    for (let i = 0; i < lungimeListaParinti / 2; i++) {
      this.initializareDescendent(i, lungimeListaParinti - i - 1, 1, 0)
      this.initializareDescendent(i, lungimeListaParinti - i - 1, 1, 1)
    }

  }

  mutatieComplementara() {
    let mutanti: number = Math.floor(this.problemaAg.populatieActuala * this.problemaAg.probabilitateaDeMutatie);
    for (let i = 0; i < mutanti; i++) {
      let individulMutant: number = this.getRandomInt(this.problemaAg.populatieActuala);
      let genaMutanta: number = this.getRandomInt(this.problemaAg.numarComponente);
      this.problemaAg.populatie[individulMutant].cantitatiProduse[genaMutanta] =
        this.problemaAg.cantitateMaxima[genaMutanta] - this.problemaAg.populatie[individulMutant].cantitatiProduse[genaMutanta];
      this.problemaAg.populatie[individulMutant].fitness = this.fitness(this.problemaAg.populatie[individulMutant]);
    }

  }

  final(nrMaxGeneratii, populatieMaxima) {
    return ((this.problemaAg.generatieActuala === nrMaxGeneratii) || (this.problemaAg.populatieActuala >= populatieMaxima))
  }

  resetareProblema(): ProblemaAG {
    let date: ProblemaAG = {
      costuri: [],
      dimensiuneaInitialaPopulatie: 0,
      dimensiuneaMaximaPopulatie: 0,
      generatieActuala: 0,
      generatii: [],
      cantitateMaxima: [],
      numarComponente: 0,
      numarulMaximDeGeneratii: 0,
      populatie: [],
      populatieActuala: 0,
      probabilitateaDeIncrucisare: 0,
      probabilitateaDeMutatie: 0,
      venit: []
    }
    return date;
  }

  getData() {
    this.problemaAg = this.resetareProblema();
    this.citireParametri();
    this.citireDateIntrare();
    this.initializarePopulatie();
    this.adaugareGeneratie(this.problemaAg);
    this.adaugarePopulatieLaGeneratie(this.problemaAg);
    this.evaluareFitnessMaximGeneratie(this.problemaAg);


    do {
      this.trecereLaGeneratiaUrmatoare(this.problemaAg);
      this.adaugareGeneratie(this.problemaAg);
      this.selectieRuleta(this.problemaAg)
      this.incrucisare()
      this.mutatieComplementara();
      this.adaugarePopulatieLaGeneratie(this.problemaAg);
      this.evaluareFitnessMaximGeneratie(this.problemaAg)
    } while (!this.final(this.problemaAg.numarulMaximDeGeneratii, this.problemaAg.dimensiuneaMaximaPopulatie))

    return this.problemaAg;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}
