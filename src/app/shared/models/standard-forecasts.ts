export class StandardForecasts {


    constructor(
        public cityName: string,
        public description: string,
        public temp: string,
        public date: string,
        public country: string,
        public humidity: number,
        public pressure: number,
        public tempMax: number,
        public tempMin: number,
        public main: string,
        public speed: number,
        public degree: number,
        public icon: string
    ) {}
}