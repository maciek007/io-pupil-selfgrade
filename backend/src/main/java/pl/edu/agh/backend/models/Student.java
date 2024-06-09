package pl.edu.agh.backend.models;

import lombok.Getter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@Getter
public class Student {
    private final String name;
    private final HashMap<String, List<Answer>> answers;

    public Student(String name) {
        this.name = name;
        answers = new HashMap<>();
    }

    public boolean addAnswer(String answerer, Answer answer) {
        if (!answers.containsKey(answerer)) {
            answers.put(answerer, new ArrayList<>());
        }
        List<Answer> list = answers.get(answerer);

        if (!isAlreadyAnswered(list, answer)) {
            list.add(answer);
            return true;
        }
        return false;
    }

    private boolean isAlreadyAnswered(List<Answer> answerList, Answer answer) {
        return answerList.stream().anyMatch(a -> a.question().equals(answer.question()));
    }

    public List<Answer> getAnswers() {
        if (answers.isEmpty()) {
            return new LinkedList<>();
        }
        List<Answer> result = new LinkedList<>();
        for (String answerer : answers.keySet()) {
            result.addAll(answers.get(answerer));
        }
        return result;
    }
}
