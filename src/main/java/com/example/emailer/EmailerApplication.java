package com.example.emailer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.stereotype.Controller;

@SpringBootApplication
@RestController
public class EmailerApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmailerApplication.class, args);
		System.out.println("nigga");
	}

	@GetMapping("/")
	public String sayHello(@RequestParam(value = "Samuel", defaultValue = "World") String name) {
		return String.format("Hello %s!", name);
	}

}
