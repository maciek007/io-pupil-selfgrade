package pl.edu.agh.backend.services;

import org.springframework.stereotype.Service;
import pl.edu.agh.backend.Student;
import pl.edu.agh.backend.VirtualClass;
import pl.edu.agh.backend.exceptions.types.StudentAlreadyExistsException;
import pl.edu.agh.backend.exceptions.types.StudentNotFoundException;
import pl.edu.agh.backend.exceptions.types.VirtualClassAlreadyCreatedException;
import pl.edu.agh.backend.exceptions.types.VirtualClassNotFoundException;

@Service
public class VirtualClassService {
    private VirtualClass virtualClass = null;

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
}
