package pl.edu.agh.backend.services;

import org.springframework.stereotype.Service;
import pl.edu.agh.backend.models.FillableForm;
import pl.edu.agh.backend.models.Form;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FormsService {
    public final VirtualClassService virtualClassService;


    public FormsService(VirtualClassService virtualClassService) {
        this.virtualClassService = virtualClassService;
    }

    /**
     * Generates forms for all students in the class.
     * KEY: Student name, VALUE: List of forms which other students have to fill
     *
     * @return map of forms for each student
     */
    public Map<String, List<FillableForm>> generateForms() {
        Map<String, List<FillableForm>> forms = new HashMap<>();
        List<String> students = virtualClassService.getStudents();
        Form form = virtualClassService.getForm();

        for (String student : students) {
            List<FillableForm> studentForms = form.generateForms(student, students);
            forms.put(student, studentForms);
        }

        return forms;
    }
}
