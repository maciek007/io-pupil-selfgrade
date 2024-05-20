package pl.edu.agh.backend.exceptions.types;

public class VirtualClassNotFoundException extends RuntimeException {
    public VirtualClassNotFoundException() {
        super("Wirtualna klasa nie istnieje");
    }
}
