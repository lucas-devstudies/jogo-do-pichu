import { TypeBetName } from "./TypeBet";

export class Bet{
    id!:number;
    typeBet!:TypeBetName;
    listNumber!:NumBet[]
    balance!:number;
    value!:number;
    returnBet!:number;
    createdAt!:string;
    result!:number;
}
export class NumBet{
    id?:number;
    number!:number;
    name!:string;
}
export class BetDTO{
    typeBet!:TypeBetName;
    listNumber!:NumBet[]
    balance!:number;
}