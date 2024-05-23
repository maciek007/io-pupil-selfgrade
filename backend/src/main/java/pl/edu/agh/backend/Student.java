package pl.edu.agh.backend;

import lombok.Getter;
import pl.edu.agh.backend.models.Form;

import java.util.HashMap;

@Getter
public class Student {
    private final String name;
    private final HashMap<String, Form> forms;

    public Student(String name) {
        this.name = name;
        forms = new HashMap<>();
    }

    public boolean addForm(String name, Form form) {
        if (!forms.containsKey(name)) {
            forms.put(name, form);
            return true;
        }
        return false;
    }

    public void removeForm(String name) {
        forms.remove(name);
    }

    public void addForms(HashMap<String, Form> forms) {
        this.forms.putAll(forms);
    }
}
