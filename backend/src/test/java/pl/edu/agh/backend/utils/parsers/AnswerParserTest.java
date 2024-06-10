package pl.edu.agh.backend.utils.parsers;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.jupiter.api.Test;
import pl.edu.agh.backend.models.Answer;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AnswerParserTest {
    private static final String VALID_JSON_SINGLE_ANSWER = "{\"question\": \"Single answer question\", \"answers\": [\"Single answer\"]}";
    private static final String VALID_JSON_MULTI_ANSWER = "{\"question\": \"Multiple answers question\", \"answers\": [\"First answer\", \"Second answer\", \"Third answer\"]}";


    @Test
    void shouldParseSingleAnswer() throws JsonProcessingException {
        // given
        int answerSize = 1;
        String question = "Single answer question";

        // when
        Answer result = AnswerParser.parse(VALID_JSON_SINGLE_ANSWER);

        // then
        assertEquals(question, result.question());
        assertEquals(answerSize, result.answers().size());
    }

    @Test
    void shouldParseMultiAnswer() throws JsonProcessingException {
        // given
        int answerSize = 3;
        String question = "Multiple answers question";

        // when
        Answer result = AnswerParser.parse(VALID_JSON_MULTI_ANSWER);

        // then
        assertEquals(question, result.question());
        assertEquals(answerSize, result.answers().size());
    }

}
