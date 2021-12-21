import { Injectable } from "@nestjs/common";
import { Masa } from "./common/masa";

interface Cromozon {
  listaInvitati: number[];
  listaInceputMese: number[];
  fitnsesIndivid: number
}


@Injectable()
export class Problema3HillClimbingService {

  solutieCandidat: Cromozon;
  numarLocuriMese: number[];
  numarDeInvitati: number;
  bunaDispozitie: number[][] = [];
  numarAlterari: number;


  setareDateIntrare() {
    this.numarLocuriMese = [2, 3, 2, 4, 4];
    this.numarDeInvitati = 15;
  }

  citireParametri() {
    this.numarAlterari = 7;
    //Initializare matrice de buna dispozitie
    if (this.bunaDispozitie.length < 1) {
      for (let i = 0; i < this.numarDeInvitati; i++) {
        this.bunaDispozitie.push([0]);
        for (let j = 0; j < this.numarDeInvitati; j++) {
          if (i == j) {
            this.bunaDispozitie[i][j] = 100;
            continue;
          }
          this.bunaDispozitie[i][j] = this.getRandomInt(101)
        }
      }
    }
  }

  initializareIndivid(): Cromozon {
    let individ: Cromozon = {
      fitnsesIndivid: 0, listaInvitati: [], listaInceputMese: []
    }
    for (let invitat = 0; invitat < this.numarDeInvitati; invitat++) {
      individ.listaInvitati.push(invitat)
    }
    console.log('lista invitati', individ.listaInvitati)
    this.ordonareArrayAleator(individ.listaInvitati);
    console.log('lista invitati ordonata aleator', individ.listaInvitati);
    let x = 0;
    do {
      this.initializareLocuriMese(individ)
      console.log('reinitializare locuri mese')
      individ.fitnsesIndivid = this.fitnessIndivid(individ)
      x++
    } while (individ.fitnsesIndivid < 1 && x < 10);
    return individ
  }

  initializareLocuriMese(individ: Cromozon): Cromozon {
    individ.listaInceputMese = []
    for (let masa = 1; masa < this.numarLocuriMese.length; masa++) {
      individ.listaInceputMese.push(this.randomIntFromInterval(2, this.numarDeInvitati - 3))
    }
    console.log('lista Inceput mese', individ.listaInceputMese)
    this.ordonareArrayAleator(individ.listaInceputMese)
    console.log('lista Inceput mese aleator', individ.listaInceputMese)
    individ.listaInceputMese = this.sortareOrdineCrescatoareArray(individ.listaInceputMese)
    // individ.listaInceputMese.push(this.numarLocuriMese.length - 1);
    individ.listaInceputMese.unshift(0);
    individ.listaInceputMese.push(individ.listaInvitati.length)
    console.log('lista inceput mese ordonata crescator', individ.listaInceputMese)
    return individ;
  }


  ordonareArrayAleator(array: number[]) {
    let indexCurent = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (indexCurent != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * indexCurent);
      indexCurent--;

      // And swap it with the current element.
      [array[indexCurent], array[randomIndex]] = [
        array[randomIndex], array[indexCurent]];
    }

    return array;
  }



  schimbareLoc(listaInvitati: number[]): number[] {
    let listaNouaInvitati: number[] = [...listaInvitati]
    let locInvitat1: number = this.getRandomInt(this.numarDeInvitati)
    let locInvitat2: number;
    do {
      locInvitat2 = this.getRandomInt(this.numarDeInvitati);
    } while (locInvitat1 === locInvitat2)
    let aux: number;
    // console.log(listaInvitati)

    aux = listaNouaInvitati[locInvitat1];
    listaNouaInvitati[locInvitat1] = listaNouaInvitati[locInvitat2]
    listaNouaInvitati[locInvitat2] = aux;
    console.log('au fost schimbați', locInvitat1, listaNouaInvitati[locInvitat1], locInvitat2, listaNouaInvitati[locInvitat2])
    // console.log(listaInvitati)
    return listaNouaInvitati;
  }

  fitnessIndivid(individ: Cromozon): number {
    let fitnessIndivid: number = 100;
    for (let masa = 0; masa < individ.listaInceputMese.length - 1; masa++) {
      if (individ.listaInceputMese[masa + 1] - individ.listaInceputMese[masa] === 0) {
        continue;
      }
      if (individ.listaInceputMese[masa + 1] - individ.listaInceputMese[masa] === 1) {
        // console.log('individ.listaInceputMese[masa+1]', individ.listaInceputMese[masa + 1])
        // console.log('individ.listaInceputMese[masa]', individ.listaInceputMese[masa])
        fitnessIndivid = 0.1
        continue;
      }

      //TODO: De introdus logica pentru 1 invitat la masa
      let fitness: number = 100
      let invitat1: number = individ.listaInvitati[individ.listaInceputMese[masa]];
      let invitat2: number = individ.listaInvitati[individ.listaInceputMese[masa + 1] - 1];
      fitness = this.comparareFitness(individ, invitat1, invitat2, fitness);
      for (let j = individ.listaInceputMese[masa]; j < individ.listaInceputMese[masa + 1] - 1; j++) {
        fitness = this.comparareFitness(individ, individ.listaInvitati[j], individ.listaInvitati[j + 1], fitness);
        if (fitness < fitnessIndivid) {
          fitnessIndivid = fitness;
        }
      }
      // console.log('...................')
    }
    return fitnessIndivid;
  }

  comparareFitness(individ: Cromozon, invitat1: number, invitat2: number, fitnessActual: number): number {
    let bunaDispozitie1 = this.bunaDispozitie[invitat1][invitat2];
    let bunaDispozitie2 = this.bunaDispozitie[invitat2][invitat1];
    // console.log('invitat1', invitat1)
    // console.log('bunaDispozitie1', bunaDispozitie1)
    // console.log('invitat2', invitat2)
    // console.log('bunaDispozitie2', bunaDispozitie2)


    if (bunaDispozitie1 < fitnessActual) {
      fitnessActual = bunaDispozitie1;
    }
    if (bunaDispozitie2 < fitnessActual) {
      fitnessActual = bunaDispozitie2;
    }
    return fitnessActual;
  }

  getData() {
    this.setareDateIntrare();
    this.citireParametri()
    let bunaDispozitie = this.bunaDispozitie;
    let individBest: Cromozon = {
      listaInvitati: [],
      listaInceputMese: [],
      fitnsesIndivid: 0
    }
    console.log('Se alege o soluție candidat inițială')
    let repetariTotale = 5;
    do {
      let individInitial = this.initializareIndivid();
      // console.log(individInitial.listaInvitati)
      // console.log('buna dispozitie', this.bunaDispozitie)
      let x = 5; // Numărul de repetări
      do {

        let r = this.schimbareLoc(individInitial.listaInvitati);
        let individTest: Cromozon = {
          listaInvitati: r,
          listaInceputMese: individInitial.listaInceputMese,
          fitnsesIndivid: 0
        }
        individTest.fitnsesIndivid = this.fitnessIndivid(individTest);
        console.log('individTest', individTest)
        for (let i = 0; i < this.numarAlterari; i++) {
          let w = this.schimbareLoc(individInitial.listaInvitati);
          let fitness = this.fitnessIndivid({
            listaInvitati: w,
            listaInceputMese: individInitial.listaInceputMese,
            fitnsesIndivid: 0
          }
          )
          if (fitness > individTest.fitnsesIndivid) {
            individTest.listaInvitati = w;
            individTest.fitnsesIndivid = fitness;
          }

          console.log('~!@#!@#@!@!@*(!$&#*%&$*(&%*#$(%&**(#$%&#$*(%&#$(*%&#$')
          console.log('fitness', individTest)
        }
        if (individTest.fitnsesIndivid > individInitial.fitnsesIndivid) {
          individInitial.listaInvitati = individTest.listaInvitati;
          individInitial.fitnsesIndivid = individTest.fitnsesIndivid;
        }
        x--;
      } while (x > 0)
      if (individInitial.fitnsesIndivid > individBest.fitnsesIndivid) {
        individBest.fitnsesIndivid = individInitial.fitnsesIndivid
        individBest.listaInceputMese = individInitial.listaInceputMese
        individBest.listaInvitati = individInitial.listaInvitati
      }
      repetariTotale--;
    } while (repetariTotale > 0)

    // console.log(this.schimbareLoc(individInitial.listaInvitati))
    // console.log(individInitial.listaInvitati)

    return {
      individBest,
      bunaDispozitie,
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  sortareOrdineCrescatoareArray(lista: number[]): number[] {
    return lista.sort(function (a, b) { return a - b });
  }
}
