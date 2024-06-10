package pl.edu.agh.backend.exceptions.types;

public class FormHasNotBeenCreatedException extends  RuntimeException {
    public FormHasNotBeenCreatedException() {
        super("Formularz nie został jeszcze utworzony.");
    }
}
