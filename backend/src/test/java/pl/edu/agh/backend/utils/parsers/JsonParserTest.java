package pl.edu.agh.backend.utils.parsers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JsonParserTest {
    private static final String VALID_JSON = "{\"longQuestionFields\":[\"longQuestion1\",\"longQuestion2\"],\"shortQuestionFields\":[\"shortQuestion1\",\"shortQuestion2\"],\"multiSelectionFields\":[{\"options\":[\"option1\",\"option2\", \"options3\"]},{\"options\":[\"option4\",\"option5\"]}],\"singleSelectionFields\":[{\"options\":[\"option5\",\"option6\"]},{\"options\":[\"option7\",\"option8\"]}],\"radioButtonFields\":[\"radioButton1\",\"radioButton2\"],\"checkboxFields\":[\"checkbox1\",\"checkbox2\"]}";
    private static JsonNode jsonNode;

    @BeforeAll
    static void setUp() throws JsonProcessingException {
        jsonNode = new ObjectMapper().readTree(VALID_JSON);
    }

    @Test
    void shouldReturnParseable() {
        assertDoesNotThrow(() -> JsonParser.parseJson(VALID_JSON, "form"));
    }

    @Test
    void shouldThrowIllegalArgumentException() {
        assertThrows(IllegalArgumentException.class, () -> JsonParser.parseJson(VALID_JSON, "unknown"));
    }

    @Test
    void shouldReturnArrayField() {
        assertNotNull(JsonParser.getArrayField(jsonNode, "longQuestionFields"));
    }

    @Test
    void shouldReturnNullArrayField() {
        assertNull(JsonParser.getArrayField(jsonNode, "unknown"));
    }

    @Test
    void shouldReturnArrayOfOptions() {
        assertNotNull(JsonParser.getArrayOfOptions(jsonNode, "multiSelectionFields"));
    }

    @Test
    void shouldReturnNullArrayOfOptions() {
        assertNull(JsonParser.getArrayOfOptions(jsonNode, "unknown"));
    }

}