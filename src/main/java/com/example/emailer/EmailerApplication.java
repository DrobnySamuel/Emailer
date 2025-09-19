package com.example.emailer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@SpringBootApplication
@RestController
public class EmailerApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmailerApplication.class, args);
	}


	// seed
	@Bean
	CommandLineRunner initDatabase(EmailRepo repo) {
		return args -> {
			repo.save(new Email(null, "Meeting tomorrow", LocalDateTime.now().minusMinutes(11), "boss@company.com", "Don’t forget our meeting at 10am tomorrow.", 10, "Meeting with manager"));
			repo.save(new Email(null, "Sale at shop", LocalDateTime.now().minusMinutes(45), "promo@shop.com", "Big discounts this week only!", 1, "Advertisement"));
			repo.save(new Email(null, "Invoice #12345", LocalDateTime.now().minusHours(3), "billing@service.com", "Please find attached your invoice.", 7, "Financial document"));
			repo.save(new Email(null, "Team lunch", LocalDateTime.now().minusDays(1), "colleague@company.com", "Who’s up for lunch tomorrow?", 5, "Casual email"));
		};
	}

	@GetMapping("/")
	public String sayHello(@RequestParam(value = "Samuel", defaultValue = "World") String name) {
		return String.format("Hello %s!", name);
	}

}
