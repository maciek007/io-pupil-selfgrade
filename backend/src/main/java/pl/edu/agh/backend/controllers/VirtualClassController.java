package pl.edu.agh.backend.controllers;

import jakarta.validation.Valid;
import org.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.backend.exceptions.types.*;
import pl.edu.agh.backend.models.RequestDTO;
import pl.edu.agh.backend.services.VirtualClassService;
import pl.edu.agh.backend.utils.API_PATH;
import pl.edu.agh.backend.utils.jwt.JwtUtils;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping(path = API_PATH.root + API_PATH.virtualClass)
public class VirtualClassController {
    private final VirtualClassService virtualClassService;
    private final JwtUtils jwtUtils;

    public VirtualClassController(VirtualClassService virtualClassService, JwtUtils jwtUtils) {
        this.virtualClassService = virtualClassService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping(path = "")
    public ResponseEntity<String> createVirtualClass(@Valid @RequestBody RequestDTO request) throws VirtualClassAlreadyCreatedException {
        String name = request.getName();
        virtualClassService.createVirtualClass(name);
        String access = jwtUtils.createToken(virtualClassService.getSecurityCode());
        JSONObject json = new JSONObject();
        json.put("access", access);
        return new ResponseEntity<>(json.toString(), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "")
    public ResponseEntity<Void> deleteVirtualClass(@RequestHeader HttpHeaders headers) throws VirtualClassNotFoundException {
        try {
            String jwtToken = jwtUtils.getToken(headers);
            String name = jwtUtils.extractName(jwtToken);
            if (jwtUtils.isExpired(jwtToken) || virtualClassService.notTeacher(name)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            virtualClassService.deleteVirtualClass();
            return ResponseEntity.noContent().build();
        } catch (RequestWithoutAuthorizationException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(path = "/code")
    public ResponseEntity<String> getAccessCode() throws VirtualClassNotFoundException {
        return ResponseEntity.ok(virtualClassService.getAccessCode());
    }

    @GetMapping(path = "/name")
    public ResponseEntity<String> getClassName() throws VirtualClassNotFoundException {
        return ResponseEntity.ok(virtualClassService.getClassName());
    }

    @PostMapping(path = "/join")
    public ResponseEntity<String> joinVirtualClass(@Valid @RequestBody RequestDTO request)
            throws VirtualClassNotFoundException, StudentAlreadyExistsException, VirtualClassIsNotAccessibleException {
        if (!VirtualClassService.isAccessible) {
            throw new VirtualClassIsNotAccessibleException();
        }

        String name = request.getName();
        String code = request.getCode();
        virtualClassService.joinClass(name, code);
        String access = jwtUtils.createToken(name);
        JSONObject json = new JSONObject();
        json.put("access", access);
        return ResponseEntity.ok(json.toString());
    }

    @DeleteMapping(path = "/remove")
    public ResponseEntity<Void> removeStudent(@RequestHeader HttpHeaders headers, @Valid @RequestBody RequestDTO request)
            throws VirtualClassNotFoundException, StudentNotFoundException {
        try {
            String jwtToken = jwtUtils.getToken(headers);
            String authName = jwtUtils.extractName(jwtToken);
            if (jwtUtils.isExpired(jwtToken) || !authName.equals(request.getName())) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            virtualClassService.removeStudent(request.getName());
            return ResponseEntity.noContent().build();
        } catch (RequestWithoutAuthorizationException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(path = "/students")
    public ResponseEntity<List<String>> getStudents(@RequestHeader HttpHeaders headers) throws VirtualClassNotFoundException {
        try {
            String jwtToken = jwtUtils.getToken(headers);
            String authName = jwtUtils.extractName(jwtToken);
            if (jwtUtils.isExpired(jwtToken) || virtualClassService.notTeacher(authName)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            return ResponseEntity.ok(virtualClassService.getStudents());
        } catch (RequestWithoutAuthorizationException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
