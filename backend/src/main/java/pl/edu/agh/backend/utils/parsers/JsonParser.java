package pl.edu.agh.backend.utils.parsers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import pl.edu.agh.backend.models.Parseable;
import pl.edu.agh.backend.models.SelectQuestion;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public final class JsonParser {
    public static Parseable parseJson(String json, String value) throws IllegalArgumentException, JsonProcessingException {
        return switch (value.toLowerCase()) {
            case "form" -> FormParser.parse(json);
            case "answer" -> AnswerParser.parse(json);
            default -> throw new IllegalArgumentException("Unknown value: " + value);
        };
    }

    public static String getField(JsonNode json, String value) {
        if (json.findValue(value) == null) {
            return null;
        }

        return json.findValue(value).asText();
    }

    public static List<String> getArrayField(JsonNode json, String value) {
        if (json.findValue(value) == null) {
            return null;
        }

        JsonNode nodes = json.findValue(value);
        List<String> result = new ArrayList<>();

        for (JsonNode node : nodes) {
            result.add(node.asText());
        }

        return result;
    }

    public static List<SelectQuestion> getArrayOfOptions(JsonNode json, String value) {
        if (json.findValue(value) == null) {
            return null;
        }

        JsonNode node = json.findValue(value);
        List<SelectQuestion> result = new ArrayList<>();

        for (JsonNode jsonNode : node) {
            JsonNode question = jsonNode.findValue("question");
            Iterator<JsonNode> jsonNodeIterator = jsonNode.findValue("options").iterator();
            result.add(SelectQuestion.builder().question(question.asText()).options(parseOptions(jsonNodeIterator)).build());
        }

        return result;
    }

    private static List<String> parseOptions(Iterator<JsonNode> jsonNodeIterator) {
        List<String> options = new ArrayList<>();
        while (jsonNodeIterator.hasNext()) {
            options.add(jsonNodeIterator.next().asText());
        }
        return options;
    }
}
