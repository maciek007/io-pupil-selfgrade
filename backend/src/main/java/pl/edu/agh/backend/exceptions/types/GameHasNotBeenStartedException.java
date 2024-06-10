package pl.edu.agh.backend.exceptions.types;

public class GameHasNotBeenStartedException extends RuntimeException{

    public GameHasNotBeenStartedException() {
        super("Gra nie została jeszcze rozpoczęta.");
    }
}
