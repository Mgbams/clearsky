import { Main } from './main';
import { Weather } from './weather';
import { Wind } from './wind';
import { Sys } from './sys';

export class CityWeather {
    public name: string;
    public weather: [
         {
        main: string,
        description: string,
        icon: string
    },
];
    public main: [
        {
        tempActual: number,
        tempMin: number,
        tempMax: number,
        pressure: number,
        humidity: number
    },
];
    public wind: {
        speed: number;
    };
    public sys: {
        country: string;
    };

   /* constructor() {
        this.name = null;
        this.humidity = null;
        this.pressure = null;
       // this.temperature = new Temperature();
        //this.wind = new Wind();
       // this.weatherCondition = new Weather();
        this.tempActual = null;
        this.tempMin = null;
        this.tempMax = null;
        this.degree = null;
        this.speed = null;
        this.main = null;
        this.description = null;
    } */
}