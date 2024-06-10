package pl.edu.agh.backend.services;

import org.springframework.stereotype.Service;
import pl.edu.agh.backend.models.FillableForm;

import java.util.List;

@Service
public class GameService {
    public final FormsService formsService;

    public GameService(FormsService formsService) {
        this.formsService = formsService;
    }


    public List<FillableForm> getFormsForStudent(String studentName) {
        return formsService.generateForms().get(studentName);
    }

}
