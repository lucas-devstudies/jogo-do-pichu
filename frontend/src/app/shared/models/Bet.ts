import { TypeBetName } from "./TypeBet";

export class Bet{
    id!:number;
    typeBet!:TypeBetName;
    listNumber!:NumBet[]
    balance!:number;
    value!:number;
    returnBet!:number;
    createdAt!:string;
    retult!:number;
}
export class NumBet{
    id?:number;
    number!:number;
}
export class BetDTO{
    typeBet!:TypeBetName;
    listNumber!:NumBet[]
    balance!:number;
}