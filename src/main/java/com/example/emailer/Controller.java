package com.example.emailer;

import com.example.emailer.Email;
import com.example.emailer.EmailRepo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/emails")
public class Controller {

    private final EmailRepo repo;

    public Controller(EmailRepo repo) {
        this.repo = repo;
    }

    // GET all emails
    @GetMapping
    public List<Email> getAll() {
        return repo.findAll();
    }

    // GET only important emails
    @GetMapping("/important")
    public List<Email> getImportant() {
        return repo.findByImportance("high");
    }

    // POST new email
    @PostMapping
    public Email addEmail(@RequestBody Email email) {
        return repo.save(email);
    }
}
