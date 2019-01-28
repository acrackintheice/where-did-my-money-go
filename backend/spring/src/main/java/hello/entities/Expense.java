package hello.entities;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import org.springframework.data.annotation.Id;

public class Expense {

    @JsonIgnore
    @Id
    public String id;

    public Double value;

    public User user;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    public LocalDateTime date;

    public String location;

    public Tag tag;

    public Expense() {
    }

    public Expense(Double value, User user, LocalDateTime date, String location, Tag tag) {
        this.value = value;
        this.date = date;
        this.location = location;
        this.user = user;
        this.tag = tag;
    }

    public Expense(Double value, User user, LocalDateTime date, String location) {
        this.value = value;
        this.date = date;
        this.location = location;
        this.user = user;
        this.tag = new Tag("undefined", "times");
    }

    @Override
    public String toString() {
        return String.format("Expense[id=%s, value='%s', user='%s', date='%s']", id, value, date, user);
    }

    @Override
    public boolean equals(Object obj) {
        if (obj != null)
            return (obj instanceof Expense) ? ((Expense) obj).id == this.id : false;
        else 
            return false;
    }

    @Override
    public int hashCode()
    {
        int hash = 7;
        hash = 31 * hash + Integer.parseInt(id);
        return hash;
    }
}