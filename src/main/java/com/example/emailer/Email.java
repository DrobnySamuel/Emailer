package com.example.emailer;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class Email {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime delivered;
    private String sender;
    private String body;

    private int importance; // 0 - 10
    private String reason;

    private boolean seen;


    public Email(Long id, String subject, LocalDateTime delivered, String sender, String body, int importance, String reason) {
        this.id = id;
        this.subject = subject;
        this.delivered = delivered;
        this.sender = sender;
        this.body = body;
        this.importance = importance;
        this.reason = reason;
        this.seen = false;
    }

    public Email() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public LocalDateTime getDelivered() {
        return delivered;
    }

    public void setDelivered(LocalDateTime delivered) {
        this.delivered = delivered;
    }

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }

    public int getImportance() { return importance; }
    public void setImportance(int importance) { this.importance = importance; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
