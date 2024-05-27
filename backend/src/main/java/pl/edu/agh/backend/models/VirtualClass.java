package pl.edu.agh.backend.models;

import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Random;

@Getter
public class VirtualClass {
    private final String className;
    private final HashMap<String, Student> students;
    private final String accessCode;
    @Setter
    private Form form;

    public VirtualClass(String className) {
        this.className = className;
        students = new HashMap<>();
        accessCode = generateAccessCode();
    }

    private String generateAccessCode() {
        Random random = new Random();
        return String.valueOf(random.nextInt(10000, 100000));
    }

    public boolean addStudent(Student student) {
        if (students.containsKey(student.getName())) {
            return false;
        }
        students.put(student.getName(), student);
        return true;
    }

    public boolean removeStudent(String name) {
        return students.remove(name) != null;
    }
}
