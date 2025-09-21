package com.example.emailer;

import com.example.emailer.Email;
import com.example.emailer.EmailRepo;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/emails")
public class Controller {

    private final EmailRepo repo;
    private final AiService aiService;

    public Controller(EmailRepo repo, AiService aiService) {
        this.repo = repo;
        this.aiService = aiService;
    }

    // GET all emails
    @GetMapping
    public List<Email> getAll() {
        return repo.findAll();
    }

    // GET only important emails
    @GetMapping("/important")
    public List<Email> getImportant(@RequestParam(defaultValue = "10") int importance) {
        return repo.findByImportance(importance);
    }

    // POST new email
    @PostMapping
    public Email addEmail(@RequestBody Email email) {
        return repo.save(email);
    }

    @PutMapping("/{id}/seen")
    public Email markAsSeen(@PathVariable Long id) {
        Email email = repo.findById(id).orElseThrow();
        email.setSeen(true);
        return repo.save(email);
    }

    @GetMapping("/emails/assign-importance")
    public List<Email> assignImportance() {
        List<Email> emails = repo.findByImportance(-1);
        for (Email email : emails) {
            int importance = aiService.determineImportance(email);
            email.setImportance(importance);
            repo.save(email);
        }
        return emails;
    }
}
