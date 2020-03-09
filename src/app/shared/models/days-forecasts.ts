import { Main } from './main';
import { Weather } from './weather';
import { Wind } from './wind';


export class DaysForecasts {

    public name: string;
    public humidity: number;
    public pressure: number;
    public weather: Weather[];
    public temperature: Main[];
    public wind: Wind[];
}