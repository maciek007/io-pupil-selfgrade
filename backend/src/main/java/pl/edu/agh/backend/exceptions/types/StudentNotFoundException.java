package pl.edu.agh.backend.exceptions.types;

public class StudentNotFoundException extends RuntimeException {
    public StudentNotFoundException(String name) {
        super("Studenta " + name + " nie ma w klasie");
    }
}
