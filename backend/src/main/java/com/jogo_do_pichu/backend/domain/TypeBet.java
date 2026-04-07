package com.jogo_do_pichu.backend.domain;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Getter
@AllArgsConstructor
@Schema(description = "Define a modalidade da aposta e suas regras de premiação")
public enum TypeBet {
    @Schema(description = "Aposta baseada em Pokémons (1 a 1025). Permite até 5 números.")
    POKEMON("POKEMON",1025,5,1000),
    @Schema(description = "Aposta baseada em Regiões (1 a 10). Permite até 2 números.")
    REGION("REGION",10,2,7);

    @Schema(description = "Nome amigável da modalidade", example = "POKEMON")
    private final String name;

    @Schema(description = "Limite máximo do número que pode ser sorteado", example = "1025")
    private final int sizeBet;

    @Schema(description = "Quantidade máxima de números que o usuário pode escolher", example = "5")
    private final int maxBet;

    @Schema(description = "Fator multiplicador base para premiação", example = "1000")
    private final int returnBet;

    public int getFactorByQuantity(int quantity) {
        int factor = 0;
        if (this == POKEMON) {
            factor = switch (quantity) {
                case 1 -> 1000;
                case 2 -> 400;
                case 3 -> 300;
                case 4 -> 200;
                case 5 -> 80;
                default -> 0;
            };
        } else {
            factor = switch (quantity) {
                case 1 -> 7;
                case 2 -> 3;
                default -> 0;
            };
        }
        if (factor == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A quantidade de números apostados é inválida");
        }
        return factor;
    }
}
