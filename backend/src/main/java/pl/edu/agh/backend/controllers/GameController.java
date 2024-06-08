package pl.edu.agh.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.backend.services.GameService;
import pl.edu.agh.backend.services.VirtualClassService;
import pl.edu.agh.backend.utils.API_PATH;

@RestController
@CrossOrigin
@RequestMapping(path = API_PATH.root + API_PATH.game)
public class GameController {

    public final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping(path = "/start")
    public ResponseEntity<String> startGame() {
        VirtualClassService.isAccessible = false;

        return ResponseEntity.ok("Gra rozpoczęta. Studentom zostały przypisane formularze do wypełnienia.");
    }

    @PostMapping(path = "/end")
    public ResponseEntity<String> endGame() {
        return ResponseEntity.ok("Gra zakończona. Formularze zostały zapisane.");
    }

    @GetMapping(path = "/getForm/{name}")
    public ResponseEntity<String> getForm(@PathVariable String name) {
        if (VirtualClassService.isAccessible) {
            return ResponseEntity.badRequest().body("Gra jeszcze się nie rozpoczęła");
        }

        return ResponseEntity.ok(gameService.getFromsForStudent(name).toString());
    }
}
