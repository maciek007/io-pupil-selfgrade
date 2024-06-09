package pl.edu.agh.backend.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.backend.exceptions.types.RequestWithoutAuthorizationException;
import pl.edu.agh.backend.models.Answer;
import pl.edu.agh.backend.services.VirtualClassService;
import pl.edu.agh.backend.utils.API_PATH;
import pl.edu.agh.backend.utils.jwt.JwtUtils;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = API_PATH.root + API_PATH.form)
public class FormsController {
    private final VirtualClassService virtualClassService;
    private final JwtUtils jwtUtils;

    public FormsController(VirtualClassService virtualClassService, JwtUtils jwtUtils) {
        this.virtualClassService = virtualClassService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping(path = "")
    public ResponseEntity<Void> createForm(@RequestHeader HttpHeaders headers, @RequestBody String json) {
        try {
            String jwtToken = jwtUtils.getToken(headers);
            String authName = jwtUtils.extractName(jwtToken);
            if (jwtUtils.isExpired(jwtToken) || virtualClassService.notTeacher(authName)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            if (virtualClassService.addForm(json)) {
                return ResponseEntity.ok().build();
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (RequestWithoutAuthorizationException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(path = "/answer/{name}")
    public ResponseEntity<Void> answerForm(@PathVariable String name, @RequestHeader HttpHeaders headers, @RequestBody String json) {
        try {
            String jwtToken = jwtUtils.getToken(headers);
            String authName = jwtUtils.extractName(jwtToken);
            if (jwtUtils.isExpired(jwtToken) || virtualClassService.notStudent(authName)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            if (virtualClassService.addAnswer(name, authName, json)) {
                return ResponseEntity.ok().build();
            }
            return new ResponseEntity<>(HttpStatus.CONFLICT);

        } catch (RequestWithoutAuthorizationException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(path = "/answer/{name}")
    public ResponseEntity<List<Answer>> getAnswers(@PathVariable String name, @RequestHeader HttpHeaders headers) {
        try {
            String jwtToken = jwtUtils.getToken(headers);
            String authName = jwtUtils.extractName(jwtToken);
            if (jwtUtils.isExpired(jwtToken) || virtualClassService.notStudent(authName)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            return ResponseEntity.ok(virtualClassService.getAnswers(name));

        } catch (RequestWithoutAuthorizationException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
