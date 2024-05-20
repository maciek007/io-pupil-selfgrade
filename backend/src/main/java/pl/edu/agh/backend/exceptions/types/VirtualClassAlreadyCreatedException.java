package pl.edu.agh.backend.exceptions.types;

public class VirtualClassAlreadyCreatedException extends RuntimeException {
    public VirtualClassAlreadyCreatedException() {
        super("Wirtualna klasa już istnieje");
    }
}
