package pl.edu.agh.backend.models;

import lombok.Builder;

import java.util.List;

@Builder
public record Form(List<String> longQuestions, List<String> shortQuestions, List<List<String>> multiSelections,
                   List<List<String>> singleSelections,
                   List<String> radioButtons, List<String> checkboxes) implements Parseable {

    public Form {
        if (longQuestions == null) {
            throw new IllegalArgumentException("Form field longQuestion cannot be null");
        }

        if (longQuestions.isEmpty()) {
            throw new IllegalArgumentException("Form field longQuestion cannot be empty");
        }
    }
}
