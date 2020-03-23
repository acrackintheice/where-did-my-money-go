package hello.repositories;

import hello.model.entities.Expense;
import hello.model.projections.CompleteExpense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(exposedHeaders = {"Location"})
@RepositoryRestResource(excerptProjection = CompleteExpense.class)
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findAllByUserGoogleId(String googleId);

}