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
import pl.edu.agh.backend.utils.validators.FormJsonValidator;

@Service
public class VirtualClassService {
    private VirtualClass virtualClass = null;
    private final FormJsonValidator formJsonValidator;

    public VirtualClassService() {
        this.formJsonValidator = new FormJsonValidator(JsonSchemaFactory.getSchema("form"));
    }

    public void createVirtualClass(String className) throws VirtualClassAlreadyCreatedException {
        if (virtualClass != null) {
            throw new VirtualClassAlreadyCreatedException();
        }
        virtualClass = new VirtualClass(className);
    }

    public boolean deleteVirtualClass(String name) throws VirtualClassNotFoundException {
        if (virtualClass == null) {
            throw new VirtualClassNotFoundException();
        }
        if (!virtualClass.getClassName().equals(name)) {
            return false;
        }
        virtualClass = null;
        return true;
    }

    public String getAccessCode() throws VirtualClassNotFoundException {
        if (virtualClass == null) {
            throw new VirtualClassNotFoundException();
        }
        return virtualClass.getAccessCode();
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

    public boolean removeStudent(String name, String authName)
            throws StudentNotFoundException, VirtualClassNotFoundException {
        if (virtualClass == null) {
            throw new VirtualClassNotFoundException();
        }

        if (virtualClass.getClassName().equals(authName) || authName.equals(name)) {
            if (!virtualClass.removeStudent(name)) {
                throw new StudentNotFoundException(name);
            }
            return true;
        }
        return false;
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
