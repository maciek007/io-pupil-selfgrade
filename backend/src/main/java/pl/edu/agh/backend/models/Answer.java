package pl.edu.agh.backend.models;

import lombok.Builder;

import java.util.List;

@Builder
public record Answer (String question, List<String> answers) implements Parseable {
    public Answer {
        if (question == null) {
            throw new IllegalArgumentException("Question field cannot be null");
        }

        if (answers == null ) {
            throw new IllegalArgumentException("Answers field cannot be null");
        }

        if (answers.isEmpty()) {
            throw new IllegalArgumentException("Answers field cannot be empty");
        }
    }
}
