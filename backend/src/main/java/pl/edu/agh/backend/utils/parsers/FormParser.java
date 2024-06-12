package pl.edu.agh.backend.utils.parsers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import pl.edu.agh.backend.models.Form;
import pl.edu.agh.backend.models.SelectQuestion;

import java.util.List;

public class FormParser {


    public static Form parse(String json) throws JsonProcessingException {
        JsonNode jsonNode = new ObjectMapper().readTree(json);
        return Form.builder()
                .longQuestions(parseSimpleArrayFields(jsonNode, "longQuestionFields"))
                .shortQuestions(parseSimpleArrayFields(jsonNode, "shortQuestionFields"))
                .multiSelections(parseComplexListFields(jsonNode, "multiSelectionFields"))
                .singleSelections(parseComplexListFields(jsonNode, "singleSelectionFields"))
                .checkboxes(parseSimpleArrayFields(jsonNode, "checkboxFields"))
                .build();
    }

    private static List<String> parseSimpleArrayFields(JsonNode json, String value) {
        return JsonParser.getArrayField(json, value);
    }

    private static List<SelectQuestion> parseComplexListFields(JsonNode json, String value) {
        return JsonParser.getArrayOfOptions(json, value);
    }

}
