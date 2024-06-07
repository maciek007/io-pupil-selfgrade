package pl.edu.agh.backend.utils.validators;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.networknt.schema.JsonSchema;

public class JsonValidator {
    protected final JsonSchema schema;

    public JsonValidator(JsonSchema schema) {
        this.schema = schema;
    }

    public boolean validate(String json) throws JsonProcessingException {
        JsonNode jsonNode = parseJson(json);
        return schema.validate(jsonNode).isEmpty();
    }

    private JsonNode parseJson(String json) throws JsonProcessingException {
        return new ObjectMapper().readTree(json);
    }
}
