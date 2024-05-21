package pl.edu.agh.backend.utils.validators;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.networknt.schema.JsonSchema;

public abstract class JsonValidator {
    protected final JsonSchema schema;

    public JsonValidator(JsonSchema schema) {
        this.schema = schema;
    }

    public abstract boolean validate(String json) throws JsonProcessingException;
}
