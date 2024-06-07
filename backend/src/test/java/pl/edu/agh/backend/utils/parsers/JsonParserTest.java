package pl.edu.agh.backend.utils.parsers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JsonParserTest {
    private static final String VALID_FORM_JSON = "{\"longQuestionFields\":[\"longQuestion1\",\"longQuestion2\"],\"shortQuestionFields\":[\"shortQuestion1\",\"shortQuestion2\"],\"multiSelectionFields\":[{\"options\":[\"option1\",\"option2\", \"options3\"]},{\"options\":[\"option4\",\"option5\"]}],\"singleSelectionFields\":[{\"options\":[\"option5\",\"option6\"]},{\"options\":[\"option7\",\"option8\"]}],\"radioButtonFields\":[\"radioButton1\",\"radioButton2\"],\"checkboxFields\":[\"checkbox1\",\"checkbox2\"]}";
    private static final String VALID_ANSWER_JSON = "{\"question\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\", \"answers\": [\"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\"]}";
    private static JsonNode jsonFormNode;
    private static JsonNode jsonAnswerNode;

    @BeforeAll
    static void setUp() throws JsonProcessingException {
        jsonFormNode = new ObjectMapper().readTree(VALID_FORM_JSON);
        jsonAnswerNode = new ObjectMapper().readTree(VALID_ANSWER_JSON);
    }

    @Test
    void shouldReturnParseableFromForm() {
        assertDoesNotThrow(() -> JsonParser.parseJson(VALID_FORM_JSON, "form"));
    }

    @Test
    void shouldReturnParseableFromAnswer() {
        assertDoesNotThrow(() -> JsonParser.parseJson(VALID_ANSWER_JSON, "answer"));
    }

    @Test
    void shouldThrowIllegalArgumentException() {
        assertThrows(IllegalArgumentException.class, () -> JsonParser.parseJson(VALID_FORM_JSON, "unknown"));
    }

    @Test
    void shouldReturnFieldFormQuestion() {
        assertNotNull(JsonParser.getField(jsonAnswerNode, "question"));
    }

    @Test
    void shouldReturnNullFormAnswer() {
        assertNull(JsonParser.getField(jsonAnswerNode, "unknown"));
    }

    @Test
    void shouldReturnArrayFieldFromForm() {
        assertNotNull(JsonParser.getArrayField(jsonFormNode, "longQuestionFields"));
    }

    @Test
    void shouldReturnArrayFieldFromAnswers() {
        assertNotNull(JsonParser.getArrayField(jsonAnswerNode, "answers"));
    }

    @Test
    void shouldReturnNullArrayField() {
        assertNull(JsonParser.getArrayField(jsonFormNode, "unknown"));
    }

    @Test
    void shouldReturnArrayOfOptions() {
        assertNotNull(JsonParser.getArrayOfOptions(jsonFormNode, "multiSelectionFields"));
    }

    @Test
    void shouldReturnNullArrayOfOptions() {
        assertNull(JsonParser.getArrayOfOptions(jsonFormNode, "unknown"));
    }

}