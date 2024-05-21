package pl.edu.agh.backend.utils.parsers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import pl.edu.agh.backend.models.Parseable;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public final class JsonParser {
    public static Parseable parseJson(String json, String value) throws IllegalArgumentException, JsonProcessingException {
        switch (value.toLowerCase()) {
            case "form":
                return FormParser.parse(json);
            default:
                throw new IllegalArgumentException("Unknown value: " + value);
        }
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

    public static List<List<String>> getArrayOfOptions(JsonNode json, String value) {
        if (json.findValue(value) == null) {
            return null;
        }

        JsonNode node = json.findValue(value);
        List<List<String>> result = new ArrayList<>();

        for (JsonNode jsonNode : node) {
            Iterator<JsonNode> jsonNodeIterator = jsonNode.findValue("options").iterator();
            result.add(parseOptions(jsonNodeIterator));
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
