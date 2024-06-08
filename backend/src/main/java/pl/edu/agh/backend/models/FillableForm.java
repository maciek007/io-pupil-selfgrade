package pl.edu.agh.backend.models;

import lombok.Builder;

@Builder
public record FillableForm(Form form, String studentName, boolean isFilled) {

    public FillableForm {
        if (form == null) {
            throw new IllegalArgumentException("FillableForm field `form` cannot be null");
        }

        if (studentName == null) {
            throw new IllegalArgumentException("FillableForm field `studentName` cannot be null");
        }

        if (studentName.isEmpty()) {
            throw new IllegalArgumentException("FillableForm field `studentName` cannot be empty");
        }
    }
}
