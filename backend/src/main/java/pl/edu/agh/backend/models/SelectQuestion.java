package pl.edu.agh.backend.models;

import lombok.Builder;

import java.util.List;

@Builder
public record SelectQuestion(String question, List<String> options) {
    public SelectQuestion {
        if (question == null || question.isEmpty()) {
            throw new IllegalArgumentException("You must provide question");
        }

        if (options == null || options.isEmpty()) {
            throw new IllegalArgumentException("You must provide options");
        }
    }
}
