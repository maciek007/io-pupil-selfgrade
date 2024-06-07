package pl.edu.agh.backend.utils.validators;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import pl.edu.agh.backend.utils.JsonSchemaFactory;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;

public class AnswerJsonValidatorTest {
    private static final String VALID_JSON = "{\"question\": \"Multiple answers question\", \"answers\": [\"First answer\", \"Second answer\", \"Third answer\"]}";
    private static final String JSON_WITHOUT_QUESTION = "{\"question\": \"Multiple answers question\"}";
    private static final String JSON_WITHOUT_ANSWER = "{\"answers\": [\"Single answer\"]}";

    private static JsonValidator validator;

    @BeforeAll
    static void setUp() {
        validator = new JsonValidator(JsonSchemaFactory.getSchema("answer"));
    }

    @Test
    void shouldReturnTrueWhenValidJson() throws JsonProcessingException {
        // given

        // when
        boolean valid = validator.validate(VALID_JSON);

        // then
        assertTrue(valid);
    }

    @Test
    void shouldReturnFalseWithoutQuestion() throws JsonProcessingException {
        // given

        // when
        boolean valid = validator.validate(JSON_WITHOUT_QUESTION);

        // then
        assertFalse(valid);
    }

    @Test
    void shouldReturnFalseWithoutAnswer() throws JsonProcessingException {
        // given

        // when
        boolean valid = validator.validate(JSON_WITHOUT_ANSWER);

        // then
        assertFalse(valid);
    }
}
