import {Injectable} from "@nestjs/common";

//TODO: De introdus factor aleator la pozitia încrucișării

interface Cromozon {
  asezariInvitatiLaMese: Masa[];
  fitnsesIndivid: number
}

interface Masa {
  asezariInvitati: number[];
  fitnessMasa: number;
}

interface SelectiaRuleta {
  individ: Cromozon;
  interval: number[];
  procent: number;
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
    this.problema.numarDeMese = 3;
    this.problema.numarMaximDeLocuriMese = [3, 4, 7]
  }

  citireParametri() {
    //Initializare matrice de buna dispozitie

    for (let i = 0; i < this.problema.numarDeInvitati; i++) {
      this.problema.bunaDispozitie.push([0]);
      for (let j = 0; j < this.problema.numarDeInvitati; j++) {
        if (i == j) {
          this.problema.bunaDispozitie[i][j] = 100;
          continue;
        }
        this.problema.bunaDispozitie[i][j] = this.getRandomInt(101)
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


  testareLocuriMese(): boolean {
    let numarator = 0;
    for (let [index, individ] of this.problema.populatie.entries())
      for (let masa in this.problema.populatie[index].asezariInvitatiLaMese) {
        if (this.problema.populatie[index].asezariInvitatiLaMese[masa].asezariInvitati.length === 1) {
          numarator++;
          break;
        }
      }
    return numarator === this.problema.dimensiuneaInitialaPopulatie;
  }

  initializarePopulatie() {
    // this.problema.populatie = [];
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
      let fitnessIndivid = 100;
      for (let masa = 0; masa < this.problema.numarDeMese; masa++) {
        let fitnessMasa: number = this.fitnessMasa(this.problema.populatie[individ].asezariInvitatiLaMese[masa].asezariInvitati, this.problema.bunaDispozitie)
        this.problema.populatie[individ].asezariInvitatiLaMese[masa].fitnessMasa = fitnessMasa;
        if (fitnessIndivid > fitnessMasa) {
          fitnessIndivid = fitnessMasa;
        }
      }
      this.problema.populatie[individ].fitnsesIndivid = fitnessIndivid;
    }


  }


  fitnessMasa(invitati: number[], bunaDispozitie: number[][]): number {
    let fitness: number = 100;
    if (invitati.length === 1) {
      return 0.1;
    }
    if (invitati.length === 0) {
      return 100;
    }
    for (let invitat = 0; invitat < invitati.length; invitat++) {

      if (invitat === 0) {
        if (fitness > bunaDispozitie[invitati[invitat]][invitati[invitat + 1]]) {
          fitness = bunaDispozitie[invitati[invitat]][invitati[invitat + 1]];
        }

        if (fitness > bunaDispozitie[invitati[invitat]][invitat[invitati.length - 1]]) {
          fitness = bunaDispozitie[invitati[invitat]][invitat[invitati.length - 1]];
        }
        continue
      }
      if (invitat === invitati.length - 1) {
        if (fitness > bunaDispozitie[invitati[invitat]][invitati[0]]) {
          fitness = bunaDispozitie[invitati[invitat]][invitati[0]];
        }
        if (fitness > bunaDispozitie[invitati[invitat]][invitati[invitat - 1]]) {
          fitness = bunaDispozitie[invitati[invitat]][invitati[invitat - 1]];
        }
        continue
      }

      if (fitness > bunaDispozitie[invitati[invitat]][invitati[invitat + 1]]) {
        fitness = bunaDispozitie[invitati[invitat]][invitati[invitat + 1]];
      }
      if (fitness > bunaDispozitie[invitati[invitat]][invitati[invitat - 1]]) {
        fitness = bunaDispozitie[invitati[invitat]][invitati[invitat - 1]];
      }

    }
    return fitness;
  }

  adaugareGeneratie(problema: ListaInvitatilorAG) {
    let generatie: Generatie = {
      fitnessMaximGeneratie: 0, indivizi: [], parinti: []
    }
    generatie.indivizi = [...problema.populatie];
    problema.generatii.push(generatie);
  }

  adaugarePopulatieLaGeneratie(problema: ListaInvitatilorAG): void {
    problema.generatii[problema.generatieActuala].indivizi = [...problema.populatie];
  }

  evaluareFitnessMaximGeneratie(problema: ListaInvitatilorAG) {
    let fitnessMaxim: number = problema.generatii[problema.generatieActuala].indivizi[0].fitnsesIndivid;
    for (let individ of problema.generatii[problema.generatieActuala].indivizi) {
      if (individ.fitnsesIndivid > fitnessMaxim) {
        fitnessMaxim = individ.fitnsesIndivid
      }
    }
    problema.generatii[problema.generatieActuala].fitnessMaximGeneratie = fitnessMaxim;
  }

  trecereLaGeneratiaUrmatoare(problema: ListaInvitatilorAG) {
    problema.generatieActuala++;
  }

  //TODO: Simplify
  selectieRuleta(problema: ListaInvitatilorAG) {
    let copiePopulatie = [...problema.populatie]
      .sort((a, b) => (a.fitnsesIndivid < b.fitnsesIndivid) ? 1 : ((b.fitnsesIndivid < a.fitnsesIndivid) ? -1 : 0));

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
        sumaFitness += copiePopulatie[i].fitnsesIndivid;
      }
      let numarAleator = this.getRandomInt(100)
      let marginiInterval: number = 0;
      for (let i = 0; i < copiePopulatie.length; i++) {
        let procent: number = copiePopulatie[i].fitnsesIndivid / sumaFitness * 100;
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


  //TODO: Simplify
  initializareDescendent(indiceParinte1: number, indiceParinte2: number, pozitieIncrucisare: number, numarDescendent: number) {
    let parinti = [...this.problema.generatii[this.problema.generatieActuala].parinti];
    let parinte1: Cromozon = parinti[indiceParinte1];
    let parinte2: Cromozon = parinti[indiceParinte2];
    let descendet: Cromozon = {asezariInvitatiLaMese: [], fitnsesIndivid: 0}
    for (let i = 0; i < this.problema.numarDeMese; i++) {
      let masa: Masa = {asezariInvitati: [], fitnessMasa: 0}
      descendet.asezariInvitatiLaMese.push(masa)
    }
    let nrLocuriMeseParinte1: Map<number, number> = new Map<number, number>();
    let nrLocuriMeseParinte2: Map<number, number> = new Map<number, number>();
    let listaInvitatiParinte1: number[] = [];
    let listaInvitatiParinte2: number[] = [];
    let listaInvitatiDescendent: number[] = [];

    for (let [index, asezareLaMese] of parinte1.asezariInvitatiLaMese.entries()) {
      nrLocuriMeseParinte1.set(index, asezareLaMese.asezariInvitati.length);
      for (let invitat of asezareLaMese.asezariInvitati) {
        listaInvitatiParinte1.push(invitat)
      }
    }

    for (let [index, asezareLaMese] of parinte2.asezariInvitatiLaMese.entries()) {
      nrLocuriMeseParinte2.set(index, asezareLaMese.asezariInvitati.length);
      for (let invitat of asezareLaMese.asezariInvitati) {
        listaInvitatiParinte2.push(invitat)
      }
    }

    let masca: number[] = [];
    let vectorDeAparitii: number[] = [];

    for (let i = 0; i < this.problema.numarDeInvitati; i++) {
      masca.push(this.getRandomInt(2));
      vectorDeAparitii.push(0);
      listaInvitatiDescendent.push(-1);
    }


    //Descendentul 1
    if (numarDescendent === 0) {
      //aplicare masca

      for (let i = 0; i < this.problema.numarDeInvitati; i++) {
        if (masca[i] === 1) {
          vectorDeAparitii[listaInvitatiParinte1[i]] = 1;
          listaInvitatiDescendent[i] = listaInvitatiParinte1[i];
        }
      }

      for (let i = 0; i < this.problema.numarDeInvitati; i++) {
        if (listaInvitatiDescendent[i] === -1) {
          for (let j = 0; j < this.problema.numarDeInvitati; j++) {
            if (vectorDeAparitii[listaInvitatiParinte2[j]] === 0) {
              listaInvitatiDescendent[i] = listaInvitatiParinte2[j];
              vectorDeAparitii[listaInvitatiParinte2[j]] = 1
              break;
            }
          }
        }
      }

      //Transformarea în liste de liste
      let indexInvitati: number = 0;
      for (let i = 0; i < this.problema.numarDeMese; i++) {
        let masa: number[] = [];
        let locuriLaMasa: number = nrLocuriMeseParinte1.get(i);
        for (let j = 0; j < locuriLaMasa; j++) {
          descendet.asezariInvitatiLaMese[i].asezariInvitati.push(listaInvitatiDescendent[indexInvitati])
          indexInvitati++;
        }
      }
    }

    //Descendentul 2
    if (numarDescendent === 1) {
      //aplicare masca

      for (let i = 0; i < this.problema.numarDeInvitati; i++) {
        if (masca[i] === 1) {
          vectorDeAparitii[listaInvitatiParinte2[i]] = 1;
          listaInvitatiDescendent[i] = listaInvitatiParinte2[i];
        }
      }

      for (let i = 0; i < this.problema.numarDeInvitati; i++) {
        if (listaInvitatiDescendent[i] === -1) {
          for (let j = 0; j < this.problema.numarDeInvitati; j++) {
            if (vectorDeAparitii[listaInvitatiParinte1[j]] === 0) {
              listaInvitatiDescendent[i] = listaInvitatiParinte1[j];
              vectorDeAparitii[listaInvitatiParinte1[j]] = 1
              break;
            }
          }
        }
      }

      //Transformarea în liste de liste
      let indexInvitati: number = 0;
      let fitnessIndivid = 100;
      for (let i = 0; i < this.problema.numarDeMese; i++) {
        let masa: number[] = [];
        let locuriLaMasa: number = nrLocuriMeseParinte2.get(i);
        for (let j = 0; j < locuriLaMasa; j++) {
          descendet.asezariInvitatiLaMese[i].asezariInvitati.push(listaInvitatiDescendent[indexInvitati])
          indexInvitati++;
        }
        descendet.asezariInvitatiLaMese[i].fitnessMasa = this.fitnessMasa(descendet.asezariInvitatiLaMese[i].asezariInvitati, this.problema.bunaDispozitie)
        if (fitnessIndivid > descendet.asezariInvitatiLaMese[i].fitnessMasa) {
          fitnessIndivid = descendet.asezariInvitatiLaMese[i].fitnessMasa;
        }
      }
      descendet.fitnsesIndivid = fitnessIndivid;
    }

    this.problema.populatie.push(descendet);
    this.problema.populatieActuala++;
  }

  incrucisare() {
    let lungimeListaParinti = this.problema.generatii[this.problema.generatieActuala].parinti.length;
    for (let i = 0; i < lungimeListaParinti / 2; i++) {
      this.initializareDescendent(i, lungimeListaParinti - i - 1, 1, 0)
      this.initializareDescendent(i, lungimeListaParinti - i - 1, 1, 1)
    }
  }

  //Schimbare locuri
  mutatie() {
    let mutanti: number = Math.floor(this.problema.populatieActuala * this.problema.probabilitateaDeMutatie);
    for (let i = 0; i < mutanti; i++) {
      let individulMutant: number = this.getRandomInt(this.problema.populatieActuala);
      let masaInvitat1: number;
      do {
        masaInvitat1 = this.getRandomInt(this.problema.numarDeMese);
      } while (this.problema.populatie[individulMutant].asezariInvitatiLaMese[masaInvitat1].asezariInvitati.length <= 1)
      let locInvitat1: number = this.getRandomInt(this.problema.populatie[individulMutant].asezariInvitatiLaMese[masaInvitat1].asezariInvitati.length)
      let masaInvitat2: number
      do {
        masaInvitat2 = this.getRandomInt(this.problema.numarDeMese);
      } while (this.problema.populatie[individulMutant].asezariInvitatiLaMese[masaInvitat2].asezariInvitati.length <= 1)
      let locInvitat2: number = this.getRandomInt(this.problema.populatie[individulMutant].asezariInvitatiLaMese[masaInvitat2].asezariInvitati.length)
      //Schimbare locuri invitati
      let aux: number;
      aux = this.problema.populatie[individulMutant].asezariInvitatiLaMese[masaInvitat2].asezariInvitati[locInvitat2]
      this.problema.populatie[individulMutant].asezariInvitatiLaMese[masaInvitat2].asezariInvitati[locInvitat2] = this.problema.populatie[individulMutant].asezariInvitatiLaMese[masaInvitat1].asezariInvitati[locInvitat1]
      this.problema.populatie[individulMutant].asezariInvitatiLaMese[masaInvitat1].asezariInvitati[locInvitat1] = aux

      //Calcul fitness masa invitat 1
      this.problema.populatie[individulMutant].asezariInvitatiLaMese[masaInvitat1].fitnessMasa = this.fitnessMasa(this.problema.populatie[individulMutant].asezariInvitatiLaMese[masaInvitat1].asezariInvitati, this.problema.bunaDispozitie)
      if (this.problema.populatie[individulMutant].asezariInvitatiLaMese[masaInvitat1].fitnessMasa > this.problema.generatii[this.problema.generatieActuala].fitnessMaximGeneratie) {
        this.problema.generatii[this.problema.generatieActuala].fitnessMaximGeneratie = this.problema.populatie[individulMutant].asezariInvitatiLaMese[masaInvitat1].fitnessMasa
      }

      //Calcul fitness masa invitat 2
      this.problema.populatie[individulMutant].asezariInvitatiLaMese[masaInvitat2].fitnessMasa = this.fitnessMasa(this.problema.populatie[individulMutant].asezariInvitatiLaMese[masaInvitat2].asezariInvitati, this.problema.bunaDispozitie)
      if (this.problema.populatie[individulMutant].asezariInvitatiLaMese[masaInvitat2].fitnessMasa > this.problema.generatii[this.problema.generatieActuala].fitnessMaximGeneratie) {
        this.problema.generatii[this.problema.generatieActuala].fitnessMaximGeneratie = this.problema.populatie[individulMutant].asezariInvitatiLaMese[masaInvitat2].fitnessMasa
      }

    }
  }

  final(nrMaxGeneratii, populatieMaxima) {
    return ((this.problema.generatieActuala === nrMaxGeneratii) || (this.problema.populatieActuala >= populatieMaxima))
  }

  resetareProblema(): ListaInvitatilorAG {
    let date: ListaInvitatilorAG = {
      bunaDispozitie: [],
      dimensiuneaInitialaPopulatie: 5,
      dimensiuneaMaximaPopulatie: 10,
      generatieActuala: 0,
      generatii: [],
      numarDeInvitati: 9,
      numarDeMese: 0,
      numarMaximDeLocuriMese: [],
      numarulMaximDeGeneratii: 10,
      populatie: [],
      populatieActuala: 0,
      probabilitateaDeIncrucisare: 0.7,
      probabilitateaDeMutatie: 0.1
    }
    return date;
  }

  getData() {

    do {
      this.problema = this.resetareProblema();
      this.citireDateIntrare();
      this.citireParametri();
      this.initializarePopulatie()
      console.log('initializare populatie')
    } while (this.testareLocuriMese())
    this.adaugareGeneratie(this.problema);
    this.adaugarePopulatieLaGeneratie(this.problema);
    this.evaluareFitnessMaximGeneratie(this.problema);
    console.log('evaluare fitnessMaxim Generație', this.problema.generatii[this.problema.generatieActuala].fitnessMaximGeneratie)
    do {
      this.trecereLaGeneratiaUrmatoare(this.problema);
      console.log('trecere la urmatoarea generatie', this.problema.generatieActuala);
      this.adaugareGeneratie(this.problema);
      this.selectieRuleta(this.problema)
      console.log('a fost facuta selectia')
      this.incrucisare()
      console.log('a fost facuta incrucisarea')
      this.mutatie();
      console.log('a fost facuta mutatia')
      this.adaugarePopulatieLaGeneratie(this.problema);
      this.evaluareFitnessMaximGeneratie(this.problema)
      console.log('evaluare fitnessMaxim Generație', this.problema.generatii[this.problema.generatieActuala].fitnessMaximGeneratie)
    } while (!this.final(this.problema.numarulMaximDeGeneratii, this.problema.dimensiuneaMaximaPopulatie))


    return this.problema;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}
