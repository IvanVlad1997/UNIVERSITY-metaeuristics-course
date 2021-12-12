import {Injectable} from "@nestjs/common";
import {Masa} from "./common/masa";

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

  setareDateIntrare() {
    this.numarLocuriMese = [3, 4, 5, 4, 3, 5];
    this.numarDeInvitati = 20;
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

    console.log('lista invitati ordonata aleator', individ.listaInvitati)
    for (let masa = 1; masa < this.numarLocuriMese.length-1; masa++) {
      individ.listaInceputMese.push(this.randomIntFromInterval(2, this.numarDeInvitati-2))
    }
    console.log('lista Inceput mese', individ.listaInceputMese)
    this.ordonareArrayAleator(individ.listaInceputMese)
    console.log('lista Inceput mese aleator', individ.listaInceputMese)

    individ.listaInceputMese = this.sortareOrdineCrescatoareArray(individ.listaInceputMese)
    console.log('lista inceput mese ordonata crescator', individ.listaInceputMese)
    // individ.listaInceputMese.push(this.numarLocuriMese.length - 1);

    return individ
  }

  generareMasa() {

  }

  generareLocuri() {

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



  schimbareMasa(listaInvitati: number[]): number[] {
    console.log("listaInvitati", listaInvitati)
    let locInvitat1: number = this.getRandomInt(this.numarDeInvitati)
    console.log("locInvitat1", locInvitat1)

    let locInvitat2: number;
    do {
      locInvitat2 =  this.getRandomInt(this.numarDeInvitati);
    } while (locInvitat1 === locInvitat2)
    console.log("locInvitat2", locInvitat2)

    let aux: number;
    aux = listaInvitati[locInvitat1];
    listaInvitati[locInvitat1] = listaInvitati[locInvitat2]
    listaInvitati[locInvitat2] = aux;
    console.log("Au fost schimbați între ei invitații de pe locurile", locInvitat1, listaInvitati[locInvitat1], "și", locInvitat2, listaInvitati[locInvitat2])
    return listaInvitati;
  }

  schimbareLoc() {

  }

  getData() {
    this.setareDateIntrare();
    this.initializareIndivid()
    let listaPentruMutatie = [
      0, 17, 11,  5, 13,  6, 2,
      4,  7, 12, 15, 19,  8, 9,
      1, 10, 16,  3, 14, 18
    ]

    let listaMutanta = this.schimbareMasa(listaPentruMutatie);

    return {
      listaPentruMutatie,
      listaMutanta
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  sortareOrdineCrescatoareArray(lista: number[]): number[] {
    return lista.sort(function(a, b){return a-b});
  }
}
