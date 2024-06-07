package pl.edu.agh.backend.utils.parsers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import pl.edu.agh.backend.models.Answer;

import java.util.List;

public class AnswerParser {

    public static Answer parse(String json) throws JsonProcessingException {
        JsonNode jsonNode = new ObjectMapper().readTree(json);
        return Answer.builder()
                .question(parseField(jsonNode))
                .answers(parseSimpleArrayFields(jsonNode))
                .build();
    }

    private static String parseField(JsonNode json) {
        return JsonParser.getField(json, "question");
    }

    private static List<String> parseSimpleArrayFields(JsonNode json) {
        return JsonParser.getArrayField(json, "answers");
    }

}
