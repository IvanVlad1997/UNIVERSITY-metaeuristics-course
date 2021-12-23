import { Injectable } from "@nestjs/common";
import { BUNADISPOZITIE, INCPUTMESE, NUMARINVITATI } from "./common/buna-dispozitie";
import * as fs from 'fs';

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
  repetariTotale: number;
  repetariPerInitializare: number;


  setareDateIntrare() {
    this.numarLocuriMese = INCPUTMESE;
    this.numarDeInvitati = NUMARINVITATI;
  }

  citireParametri() {
    this.repetariTotale = 10000;
    this.repetariPerInitializare = 1000;
    this.numarAlterari = 150;
    
    
    //Initializare matrice de buna dispozitie


    // if (this.bunaDispozitie.length < 1) {
    //   for (let i = 0; i < this.numarDeInvitati; i++) {
    //     this.bunaDispozitie.push([0]);
    //     for (let j = 0; j < this.numarDeInvitati; j++) {
    //       if (i == j) {
    //         this.bunaDispozitie[i][j] = 100;
    //         continue;
    //       }
    //       this.bunaDispozitie[i][j] = this.getRandomInt(101)
    //     }
    //   }
    // }

    this.bunaDispozitie = BUNADISPOZITIE;


  }

  initializareIndivid(): Cromozon {
    let individ: Cromozon = {
      fitnsesIndivid: 0, listaInvitati: [], listaInceputMese: []
    }
    for (let invitat = 0; invitat < this.numarDeInvitati; invitat++) {
      individ.listaInvitati.push(invitat)
    }
    this.ordonareArrayAleator(individ.listaInvitati);
    console.log('lista invitati ordonata aleator', individ.listaInvitati);
    this.initializareLocuriMese(individ)
    individ.fitnsesIndivid = this.fitnessIndivid(individ)
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
    aux = listaNouaInvitati[locInvitat1];
    listaNouaInvitati[locInvitat1] = listaNouaInvitati[locInvitat2]
    listaNouaInvitati[locInvitat2] = aux;
    return listaNouaInvitati;
  }

  fitnessIndivid(individ: Cromozon): number {
    let fitnessIndivid: number = 100;
    for (let masa = 0; masa < individ.listaInceputMese.length - 1; masa++) {
      if (individ.listaInceputMese[masa + 1] - individ.listaInceputMese[masa] === 0) {
        continue;
      }
      if (individ.listaInceputMese[masa + 1] - individ.listaInceputMese[masa] === 1) {
        fitnessIndivid = 0.1
        continue;
      }

      let fitness: number = 100
      let invitat1: number = individ.listaInvitati[individ.listaInceputMese[masa]];
      let invitat2: number = individ.listaInvitati[individ.listaInceputMese[masa + 1] - 1];
      fitness = this.comparareFitness(invitat1, invitat2, fitness);
      for (let j = individ.listaInceputMese[masa]; j < individ.listaInceputMese[masa + 1] - 1; j++) {
        fitness = this.comparareFitness(individ.listaInvitati[j], individ.listaInvitati[j + 1], fitness);
        if (fitness < fitnessIndivid) {
          fitnessIndivid = fitness;
        }
      }
    }
    return fitnessIndivid;
  }

  comparareFitness(invitat1: number, invitat2: number, fitnessActual: number): number {
    let bunaDispozitie1 = this.bunaDispozitie[invitat1][invitat2];
    let bunaDispozitie2 = this.bunaDispozitie[invitat2][invitat1];
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
    let repetariTotale = this.repetariTotale;
    do {
      let individ = this.initializareIndivid();  
      let x = this.repetariPerInitializare; // Numărul de repetări
      do {

        let r = this.schimbareLoc(individ.listaInvitati);
        let individTest: Cromozon = {
          listaInvitati: r,
          listaInceputMese: individ.listaInceputMese,
          fitnsesIndivid: 0
        }
        individTest.fitnsesIndivid = this.fitnessIndivid(individTest);
        for (let i = 0; i < this.numarAlterari; i++) {
          let w = this.schimbareLoc(individ.listaInvitati);
          let fitness = this.fitnessIndivid({
            listaInvitati: w,
            listaInceputMese: individ.listaInceputMese,
            fitnsesIndivid: 0
          }
          )
          if (fitness > individTest.fitnsesIndivid) {
            individTest.listaInvitati = w;
            individTest.fitnsesIndivid = fitness;
          }
        }
        if (individTest.fitnsesIndivid > individ.fitnsesIndivid) {
          individ.listaInvitati = individTest.listaInvitati;
          individ.fitnsesIndivid = individTest.fitnsesIndivid;
        }
        x--;
      } while (x > 0)
      if (individ.fitnsesIndivid > individBest.fitnsesIndivid) {
        individBest.fitnsesIndivid = individ.fitnsesIndivid
        individBest.listaInceputMese = individ.listaInceputMese
        individBest.listaInvitati = individ.listaInvitati
      }
      repetariTotale--;
    } while (repetariTotale > 0)

    // let text = 'fitness hill climbing ' + individBest.fitnsesIndivid +'\n'

    // fs.appendFile('helloworld.txt', JSON.stringify(individBest, null, 4), function (err) {
    //   fs.appendFile('helloworld.txt', text, function (err) {
    //   if (err) return console.log(err);
    //   console.log('Hello World > helloworld.txt');
    // });
    return {
      // individ
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
}
