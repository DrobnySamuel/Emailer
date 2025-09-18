package com.example.emailer;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.emailer.Email;

public interface EmailRepo extends JpaRepository<Email, Long> {
    List<Email> findByImportance(String importance);
}
