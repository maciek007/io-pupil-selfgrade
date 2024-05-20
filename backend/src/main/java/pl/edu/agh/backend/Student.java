package pl.edu.agh.backend;

import lombok.Getter;

@Getter
public class Student {
    private String name;

    public Student(String name) {
        this.name = name;
    }
}
