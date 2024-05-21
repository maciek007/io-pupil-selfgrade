package pl.edu.agh.backend.utils.validators;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import pl.edu.agh.backend.utils.JsonSchemaFactory;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class FormJsonValidatorTest {
    private static final String VALID_JSON_WITHOUT_OPTIONAL = "{\"longQuestionFields\": [\"Long question is correct. Long question is correct. Long question is correct.\"]}";
    private static final String VALID_JSON_WITH_OPTIONAL = "{\"longQuestionFields\": [\"Long question is correct. Long question is correct. Long question is correct.\"], \"shortQuestionFields\": [\"Short answer\"]}";
    private static final String VALID_JSON_WITH_MULTI_SELECTION_FIELD = "{\"longQuestionFields\": [\"Long question is correct. Long question is correct. Long question is correct.\"], \"multiSelectionFields\": [{\"options\": [\"Option 1\", \"Option 2\", \"Option 3\"]}, {\"options\": [\"Option 1\", \"Option 2\", \"Option 3\"]}]}";


    private static final String INVALID_JSON_WITH_OPTIONAL_EMPTY = "{\"longQuestionFields\": [\"Long question is correct. Long question is correct. Long question is correct.\"], \"shortQuestionFields\": []}";
    private static final String INVALID_JSON = "{\"longQuestionFields\": [\"Long question is correct. Long question is correct. Long question is correct.\"], \"shortQuestionFields\": [123]}";
    private static final String INVALID_JSON_TOO_SHORT = "{\"longQuestionFields\": [\"too short\"]}";
    private static final String INVALID_JSON_TOO_LONG = "{\"longQuestionFields\": " + "[\"" + " too long ".repeat(201) + "\"]" + "}";

    private static FormJsonValidator validator;

    @BeforeAll
    static void setUp() {
        validator = new FormJsonValidator(JsonSchemaFactory.getSchema("form"));
    }

    @Test
    void shouldReturnTrueWhenValidJsonWithoutOptional() throws JsonProcessingException {
        // given

        // when
        boolean validWithoutOptional = validator.validate(VALID_JSON_WITHOUT_OPTIONAL);


        // then
        assertTrue(validWithoutOptional);
    }

    @Test
    void shouldReturnFalseWhenInvalidJsonWithOptionalEmpty() throws JsonProcessingException {
        // given

        // when
        boolean invalidWithOptionalEmpty = validator.validate(INVALID_JSON_WITH_OPTIONAL_EMPTY);

        // then
        assertFalse(invalidWithOptionalEmpty);
    }

    @Test
    void shouldReturnTrueWhenValidJsonWithMultiSelectionField() throws JsonProcessingException {
        // given

        // when
        boolean validWithMultiSelectionField = validator.validate(VALID_JSON_WITH_MULTI_SELECTION_FIELD);

        // then
        assertTrue(validWithMultiSelectionField);
    }

    @Test
    void shouldReturnTrueWhenValidJsonWithOptional() throws JsonProcessingException {
        // given

        // when
        boolean validWithOptional = validator.validate(VALID_JSON_WITH_OPTIONAL);

        // then
        assertTrue(validWithOptional);
    }

    @Test
    void shouldReturnFalseWhenInvalidJson() throws JsonProcessingException {
        // given

        // when
        boolean invalid = validator.validate(INVALID_JSON);

        // then
        assertFalse(invalid);
    }

    @Test
    void shouldReturnFalseWhenInvalidJsonTooShort() throws JsonProcessingException {
        // given

        // when
        boolean invalid = validator.validate(INVALID_JSON_TOO_SHORT);

        // then
        assertFalse(invalid);
    }

    @Test
    void shouldReturnFalseWhenInvalidJsonTooLong() throws JsonProcessingException {
        // given

        // when
        boolean invalid = validator.validate(INVALID_JSON_TOO_LONG);

        // then
        assertFalse(invalid);
    }
}