package com.example.emailer;

import DTO.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class AiService {

    private final WebClient webClient;

    public AiService(@Value("${openai.api.key}") String apiKey) {
        this.webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    public int determineImportance(Email email) {
        String prompt = String.format(
                "Rate the importance of this email on a scale from 1 (low) to 10 (high).\n\n" +
                        "Subject: %s\nSender: %s\nBody: %s\n\nReturn only the number.",
                email.getSubject(), email.getSender(), email.getBody()
        );

        ChatResponse response = webClient.post()
                .uri("/chat/completions")
                .bodyValue(Map.of(
                        "model", "gpt-4o-mini",
                        "messages", new Object[]{
                                Map.of("role", "system", "content", "You are an assistant that only outputs a single integer from 1 to 10."),
                                Map.of("role", "user", "content", prompt)
                        },
                        "max_tokens", 5
                ))
                .retrieve()
                .bodyToMono(ChatResponse.class)
                .block();

        try {
            String content = response.getChoices().get(0).getMessage().getContent();
            return Integer.parseInt(content.trim());
        } catch (Exception e) {
            e.printStackTrace();
            return 5;
        }
    }
}