package com.example.electricity_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ElectricityApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ElectricityApiApplication.class, args);
	}

}
