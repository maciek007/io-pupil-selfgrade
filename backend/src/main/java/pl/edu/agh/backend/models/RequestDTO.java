package pl.edu.agh.backend.models;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestDTO {
    @NotEmpty
    private String name;
    private String code;
}
