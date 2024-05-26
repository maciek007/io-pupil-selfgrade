package pl.edu.agh.backend.services;

import org.springframework.stereotype.Service;
import pl.edu.agh.backend.Student;
import pl.edu.agh.backend.VirtualClass;
import pl.edu.agh.backend.exceptions.types.StudentAlreadyExistsException;
import pl.edu.agh.backend.exceptions.types.StudentNotFoundException;
import pl.edu.agh.backend.exceptions.types.VirtualClassAlreadyCreatedException;
import pl.edu.agh.backend.exceptions.types.VirtualClassNotFoundException;

import java.util.List;

@Service
public class VirtualClassService {
    private VirtualClass virtualClass = null;

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

    public boolean isTeacher(String name) {
        return name.equals(virtualClass.getClassName());
    }

    public boolean isStudent(String name) {
        for (String studentName : virtualClass.getStudents().keySet()) {
            if (studentName.equals(name)) {
                return true;
            }
        }
        return false;
    }
}
