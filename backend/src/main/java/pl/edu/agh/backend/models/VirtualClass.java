package pl.edu.agh.backend.models;

import lombok.Getter;
import lombok.Setter;


import java.util.*;

@Getter
public class VirtualClass {
    private final String className;
    private final HashMap<String, Student> students;
    private final String accessCode;
    private final String securityCode;
    @Setter
    private Form form;

    public VirtualClass(String className) {
        this.className = className;
        students = new HashMap<>();
        accessCode = generateAccessCode();
        securityCode = shuffle(className + accessCode);
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

    private String shuffle(String text) {
        List<String> characters = Arrays.asList(text.split(""));
        Collections.shuffle(characters);
        return String.join("", characters);
    }
}
