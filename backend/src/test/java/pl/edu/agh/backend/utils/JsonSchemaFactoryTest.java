package pl.edu.agh.backend.utils;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

class JsonSchemaFactoryTest {

    @Test
    void shouldReturnFormSchema() {
        // given
        String schemaName = "form";

        // when
        var result = JsonSchemaFactory.getSchema(schemaName);

        // then
        assertNotNull(result);
    }

    @Test
    void shouldReturnNull() {
        // given
        String schemaName = "invalid";

        // when
        var result = JsonSchemaFactory.getSchema(schemaName);

        // then
        assertNull(result);
    }
}