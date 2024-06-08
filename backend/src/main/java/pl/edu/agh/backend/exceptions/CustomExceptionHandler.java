package pl.edu.agh.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import pl.edu.agh.backend.exceptions.types.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ErrorDetails> handleAllExceptions(Exception ex, WebRequest request) {
        Map<String, String> messages = new HashMap<>();
        messages.put("message", "Internal Server Error");

        ErrorDetails errorDetails = new ErrorDetails(
                messages,
                request.getDescription(false),
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value()
        );

        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    @ExceptionHandler({
            VirtualClassNotFoundException.class,
    })
    public final ResponseEntity<ErrorDetails> handleNotFoundException(Exception ex, WebRequest request) {
        Map<String, String> messages = new HashMap<>();
        messages.put("message", ex.getMessage());

        ErrorDetails errorDetails = new ErrorDetails(
                messages,
                request.getDescription(false),
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value()
        );

        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }


    @ResponseStatus(value = HttpStatus.CONFLICT)
    @ExceptionHandler({
            VirtualClassAlreadyCreatedException.class,
            StudentAlreadyExistsException.class,
            FormHasNotBeenCreatedException.class,
            GameHasNotBeenStartedException.class

    })
    public final ResponseEntity<ErrorDetails> handleConflictException(Exception ex, WebRequest request) {
        Map<String, String> messages = new HashMap<>();
        messages.put("message", ex.getMessage());

        ErrorDetails errorDetails = new ErrorDetails(
                messages,
                request.getDescription(false),
                LocalDateTime.now(),
                HttpStatus.CONFLICT.value()
        );

        return new ResponseEntity<>(errorDetails, HttpStatus.CONFLICT);
    }

    @ResponseStatus(value = HttpStatus.LOCKED)
    @ExceptionHandler({
            VirtualClassIsNotAccessibleException.class,
    })
    public final ResponseEntity<ErrorDetails> handleLockedException(Exception ex, WebRequest request) {
        Map<String, String> messages = new HashMap<>();
        messages.put("message", ex.getMessage());

        ErrorDetails errorDetails = new ErrorDetails(
                messages,
                request.getDescription(false),
                LocalDateTime.now(),
                HttpStatus.LOCKED.value()
        );

        return new ResponseEntity<>(errorDetails, HttpStatus.LOCKED);
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler({
            GameCannotStartWithoutMinimumNumberOfStudents.class,
    })
    public final ResponseEntity<ErrorDetails> handleBadRequestException(Exception ex, WebRequest request) {
        Map<String, String> messages = new HashMap<>();
        messages.put("message", ex.getMessage());

        ErrorDetails errorDetails = new ErrorDetails(
                messages,
                request.getDescription(false),
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value()
        );

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
}
