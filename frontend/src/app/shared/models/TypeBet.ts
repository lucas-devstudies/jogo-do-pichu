export const TypeBet = {
    POKEMON: {
        name: 'POKEMON',
        sizeBet: 1025,
        maxBet: 5,
        factor: 1000 
    },
    REGION: {
        name: 'REGION',
        sizeBet: 10,
        maxBet: 2,
        factor: 7
    }
} as const;

export type TypeBetName = keyof typeof TypeBet;