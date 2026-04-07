package com.jogo_do_pichu.backend.service.util;

import org.springframework.stereotype.Component;

import java.util.concurrent.ThreadLocalRandom;

@Component
public class BetNumberGenerator {
    public int generate(int max){
        return ThreadLocalRandom.current().nextInt(1,max+1);
    }
}
