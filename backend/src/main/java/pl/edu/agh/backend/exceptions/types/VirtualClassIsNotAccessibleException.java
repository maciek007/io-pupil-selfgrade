package pl.edu.agh.backend.exceptions.types;

public class VirtualClassIsNotAccessibleException extends  RuntimeException {
    public VirtualClassIsNotAccessibleException() {
        super("Nie można dołączyć do klasy.");
    }
}
