package com.empresa.lotesapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LotesApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(LotesApiApplication.class, args);
    }
}
