package pl.edu.agh.backend.exceptions;

import java.time.LocalDateTime;
import java.util.Map;

public record ErrorDetails(Map<String, String> messages, String details, LocalDateTime timestamp, Integer status) {
}
