package pl.edu.agh.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.backend.exceptions.types.GameCannotStartWithoutMinimumNumberOfStudents;
import pl.edu.agh.backend.exceptions.types.GameHasNotBeenStartedException;
import pl.edu.agh.backend.exceptions.types.RequestWithoutAuthorizationException;
import pl.edu.agh.backend.models.FillableForm;
import pl.edu.agh.backend.services.GameService;
import pl.edu.agh.backend.services.VirtualClassService;
import pl.edu.agh.backend.utils.API_PATH;
import pl.edu.agh.backend.utils.jwt.JwtUtils;

import java.util.List;

@RestController
@RequestMapping(path = API_PATH.root + API_PATH.game)
public class GameController {

    public final GameService gameService;
    public final VirtualClassService virtualClassService;
    private final JwtUtils jwtUtils;

    public GameController(GameService gameService, VirtualClassService virtualClassService, JwtUtils jwtUtils) {
        this.gameService = gameService;
        this.virtualClassService = virtualClassService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping(path = "/start")
    public ResponseEntity<String> startGame() {
        if (virtualClassService.getNumberOfStudents() < 2) {
            throw new GameCannotStartWithoutMinimumNumberOfStudents(2);
        }

        VirtualClassService.isAccessible = false;

        return ResponseEntity.ok("Gra rozpoczęta. Studentom zostały przypisane formularze do wypełnienia.");
    }

    @PostMapping(path = "/end")
    public ResponseEntity<String> endGame() {
        //TODO: save forms
        return ResponseEntity.ok("Gra zakończona. Formularze zostały zapisane.");
    }

    @GetMapping(path = "/getForms")
    public ResponseEntity<List<FillableForm>> getForm(@RequestHeader HttpHeaders headers) {
        try {
            String jwtToken = jwtUtils.getToken(headers);
            String authName = jwtUtils.extractName(jwtToken);

            if (jwtUtils.isExpired(jwtToken)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            if (VirtualClassService.isAccessible) {
                throw new GameHasNotBeenStartedException();
            }

            return ResponseEntity.ok(gameService.getFormsForStudent(authName));

        } catch (RequestWithoutAuthorizationException|GameHasNotBeenStartedException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
