package pl.edu.agh.backend.exceptions.types;

public class StudentAlreadyExistsException extends RuntimeException {
    public StudentAlreadyExistsException(String name) {
        super("Student " + name + " już jest w klasie.");
    }
}
