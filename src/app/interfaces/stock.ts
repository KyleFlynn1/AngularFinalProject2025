export interface IStock {
    ticker: string;
    name: string;
    price: number;
    change: number;
    day_low: number;
    day_high: number;
    currency: string;
    mic_code: string;
}

export class NewStock implements IStock {
    ticker: string;
    name: string;
    price: number;
    change: number;
    day_low: number;
    day_high: number;
    currency: string;
    mic_code: string;       
    constructor(ticker: string, name: string, price: number, change: number, day_low: number, day_high: number, currency: string, mic_code: string) {
        this.ticker = ticker;
        this.name = name;
        this.price = price;
        this.change = change;
        this.day_low = day_low;
        this.day_high = day_high;
        this.currency = currency;
        this.mic_code = mic_code;
    }
}

