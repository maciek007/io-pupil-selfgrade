package pl.edu.agh.backend.exceptions.types;

public class GameCannotStartWithoutMinimumNumberOfStudents extends RuntimeException {

    public GameCannotStartWithoutMinimumNumberOfStudents(int minNumberOfStudents) {
        super("Gra nie może zostać rozpoczęta bez minimalnej liczby studentów która wynosi " + minNumberOfStudents);
    }

    public GameCannotStartWithoutMinimumNumberOfStudents(String message) {
        super(message);
    }
}
