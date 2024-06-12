package pl.edu.agh.backend.models;

import lombok.Builder;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Builder
public record Form(List<String> longQuestions, List<String> shortQuestions, List<SelectQuestion> multiSelections,
                   List<SelectQuestion> singleSelections, List<String> checkboxes) implements Parseable {

    public Form {
        if (longQuestions == null) {
            throw new IllegalArgumentException("Form field longQuestion cannot be null");
        }

        if (longQuestions.isEmpty()) {
            throw new IllegalArgumentException("Form field longQuestion cannot be empty");
        }
    }

    public List<FillableForm> generateForms(String currentStudent, List<String> students) {
        List<FillableForm> forms = new ArrayList<>(List.of());

        for (String student : students) {
            if (student.equals(currentStudent)) {
                continue;
            }
            forms.add(FillableForm.builder().form(this).studentName(student).isFilled(false).build());
        }

        Collections.shuffle(forms);

        return forms;
    }
}
