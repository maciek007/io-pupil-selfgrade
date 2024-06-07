package pl.edu.agh.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.stereotype.Service;
import pl.edu.agh.backend.models.Student;
import pl.edu.agh.backend.models.VirtualClass;
import pl.edu.agh.backend.exceptions.types.StudentAlreadyExistsException;
import pl.edu.agh.backend.exceptions.types.StudentNotFoundException;
import pl.edu.agh.backend.exceptions.types.VirtualClassAlreadyCreatedException;
import pl.edu.agh.backend.exceptions.types.VirtualClassNotFoundException;
import pl.edu.agh.backend.utils.JsonSchemaFactory;
import pl.edu.agh.backend.utils.parsers.FormParser;
import pl.edu.agh.backend.utils.validators.JsonValidator;

import java.util.List;

@Service
public class VirtualClassService {
    private VirtualClass virtualClass = null;
    private final JsonValidator formJsonValidator;

    public VirtualClassService() {
        this.formJsonValidator = new JsonValidator(JsonSchemaFactory.getSchema("form"));
    }

    public void createVirtualClass(String className) throws VirtualClassAlreadyCreatedException {
        if (virtualClass != null) {
            throw new VirtualClassAlreadyCreatedException();
        }
        virtualClass = new VirtualClass(className);
    }

    public void deleteVirtualClass() throws VirtualClassNotFoundException {
        if (virtualClass == null) {
            throw new VirtualClassNotFoundException();
        }
        virtualClass = null;
    }

    public String getAccessCode() throws VirtualClassNotFoundException {
        if (virtualClass == null) {
            throw new VirtualClassNotFoundException();
        }
        return virtualClass.getAccessCode();
    }

    public String getClassName() throws VirtualClassNotFoundException {
        if (virtualClass == null) {
            throw new VirtualClassNotFoundException();
        }
        return virtualClass.getClassName();
    }

    public String getSecurityCode() throws VirtualClassNotFoundException {
        if (virtualClass == null) {
            throw new VirtualClassNotFoundException();
        }
        return virtualClass.getSecurityCode();
    }

    public void joinClass(String name, String code)
            throws VirtualClassNotFoundException, StudentAlreadyExistsException {
        if (virtualClass == null || !virtualClass.getAccessCode().equals(code)) {
            throw new VirtualClassNotFoundException();
        }
        if (!virtualClass.addStudent(new Student(name))) {
            throw new StudentAlreadyExistsException(name);
        }
    }

    public void removeStudent(String name)
            throws StudentNotFoundException, VirtualClassNotFoundException {
        if (virtualClass == null) {
            throw new VirtualClassNotFoundException();
        }

        if (!virtualClass.removeStudent(name)) {
            throw new StudentNotFoundException(name);
        }
    }

    public List<String> getStudents() {
        if (virtualClass == null) {
            throw new VirtualClassNotFoundException();
        }
        return virtualClass.getStudents().keySet().stream().toList();
    }

    public boolean notTeacher(String securityCode) {
        return !securityCode.equals(virtualClass.getSecurityCode());
    }

    public boolean notStudent(String name) {
        for (String studentName : virtualClass.getStudents().keySet()) {
            if (studentName.equals(name)) {
                return false;
            }
        }
        return true;
    }

    public boolean addForm(String authName, String json) {
        if (virtualClass == null) {
            throw new VirtualClassNotFoundException();
        }

        if (!virtualClass.getClassName().equals(authName)) {
            return false;
        }

        try {
            if (!formJsonValidator.validate(json)) {
                throw new IllegalArgumentException("Invalid json");
            }
            virtualClass.setForm(FormParser.parse(json));
            return true;
        } catch (JsonProcessingException e) {
            return false;
        }

    }
}
