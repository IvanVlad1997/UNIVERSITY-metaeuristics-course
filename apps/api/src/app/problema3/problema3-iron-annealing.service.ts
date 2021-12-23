import {Injectable} from "@nestjs/common";
import * as fs from 'fs';
import { stringify } from "querystring";
import { BUNADISPOZITIE, INCPUTMESE, NUMARINVITATI } from "./common/buna-dispozitie";
 
interface Cromozon {
  listaInvitati: number[];
  listaInceputMese: number[];
  fitnsesIndivid: number
}

@Injectable()
export class Problema3IronAnnealingService {
 

  solutieCandidat: Cromozon;
  numarLocuriMese: number[];
  numarDeInvitati: number;
  bunaDispozitie: number[][] = [];
  betaT: number;
  repetarePasi: number;


  setareDateIntrare() {
    this.numarLocuriMese = INCPUTMESE;
    this.numarDeInvitati = NUMARINVITATI;
  }


  citireParametri() {
    this.betaT = 70 ;
    this.repetarePasi = 10;
    // Initializare matrice de buna dispozitie
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
    // this.bunaDispozitie = BUNADISPOZITIE;

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
    let sumaLocuri = 0;
    let numarLocuriMeseCopie = [...this.numarLocuriMese]
    for (let masa of numarLocuriMeseCopie) {
      sumaLocuri = sumaLocuri + masa;
    }
    console.log(numarLocuriMeseCopie)
    while (sumaLocuri > this.numarDeInvitati) {
      let index: number = this.randomIntFromInterval(0, this.numarLocuriMese.length - 1)
      numarLocuriMeseCopie[index]--;
      console.log(index)
      sumaLocuri--;
    }
    let inceput = numarLocuriMeseCopie[0];
    individ.listaInceputMese[0] = inceput;
    for (let masa = 1; masa < numarLocuriMeseCopie.length; masa ++) {
      inceput = inceput + numarLocuriMeseCopie[masa]
      individ.listaInceputMese[masa] = inceput;
    }
    individ.listaInceputMese.unshift(0);
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
    // console.log('au fost schimbați', locInvitat1, listaNouaInvitati[locInvitat1], locInvitat2, listaNouaInvitati[locInvitat2])
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
    let individInitial = this.initializareIndivid();
    do {
      let repetarePasi = this.repetarePasi;
      do {
        let r = this.schimbareLoc(individInitial.listaInvitati);
        let individTest: Cromozon = {
          listaInvitati: r,
          listaInceputMese: individInitial.listaInceputMese,
          fitnsesIndivid: 0
        }
        individTest.fitnsesIndivid = this.fitnessIndivid(individTest);
        // console.log('individTest', individTest)
        if (individTest.fitnsesIndivid > individBest.fitnsesIndivid) {
          individBest.fitnsesIndivid = individTest.fitnsesIndivid
          individBest.listaInceputMese = individTest.listaInceputMese
          individBest.listaInvitati = individTest.listaInvitati
        }
        if (individTest.fitnsesIndivid >= individInitial.fitnsesIndivid) {
          individInitial.listaInvitati = individTest.listaInvitati;
          individInitial.fitnsesIndivid = individTest.fitnsesIndivid;
          break;
        }
        if (individTest.fitnsesIndivid < individInitial.fitnsesIndivid) {
          let probabilitate = Math.pow(Math.E, (individTest.fitnsesIndivid - individInitial.fitnsesIndivid) / this.betaT)
          let aleator = Math.random();
          console.log('individTest.fitnsesIndivid', individTest.fitnsesIndivid)
          console.log('individInitial.fitnsesIndivid', individInitial.fitnsesIndivid)
          console.log('probabilitate', probabilitate)
          console.log('aleator',aleator)
          if (probabilitate >= aleator) {
            individInitial.listaInvitati = individTest.listaInvitati;
            individInitial.fitnsesIndivid = individTest.fitnsesIndivid;
            if (individTest.fitnsesIndivid > individBest.fitnsesIndivid) {
              individBest.fitnsesIndivid = individTest.fitnsesIndivid
              individBest.listaInceputMese = individTest.listaInceputMese
              individBest.listaInvitati = individTest.listaInvitati
            }
          }
        }
        repetarePasi --;
        console.log('repetarePasi', repetarePasi)
      } while (repetarePasi > 0)
      this.betaT = this.betaT - 0.005 ;
      console.log('this.betaT', this.betaT)
    } while (this.betaT > 0.3)  
    

    let text = 'fitness călirea metalelor ' + individBest.fitnsesIndivid + '\n'

    // fs.appendFile('helloworld.txt', JSON.stringify(bunaDispozitie, null, 4), function (err) {
      fs.appendFile('helloworld.txt', text, function (err) {
      if (err) return console.log(err);
      console.log('Hello World > helloworld.txt');
    });
    
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
