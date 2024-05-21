package pl.edu.agh.backend.utils;

import com.networknt.schema.JsonSchema;
import com.networknt.schema.SpecVersion;

public final class JsonSchemaFactory {
    private static final String SCHEMAS_PATH = "/schemas/";

    public static JsonSchema getSchema(String schemaName) {
        return switch (schemaName) {
            case "form" -> getFormSchema();
            default -> null;
        };
    }

    private static JsonSchema getFormSchema() {
        return com.networknt.schema.JsonSchemaFactory.getInstance(SpecVersion.VersionFlag.V4)
                .getSchema(JsonSchemaFactory.class.getResourceAsStream(SCHEMAS_PATH + "FormSchema.json"));
    }
}
