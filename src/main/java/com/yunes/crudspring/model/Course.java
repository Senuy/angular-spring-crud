package com.yunes.crudspring.model;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.yunes.crudspring.enums.Category;
import com.yunes.crudspring.enums.Status;
import com.yunes.crudspring.enums.converters.CategoryConverter;
import com.yunes.crudspring.enums.converters.StatusConverter;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;


@Data
@Entity
//@Table(name = "cursos")
@SQLDelete(sql = "UPDATE Course SET status = 'Inativo' WHERE id = ?")
@SQLRestriction("status <> 'Inativo'")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;

    @NotBlank
    @NotNull
    @Size( min = 5, max = 100)
    @Column(length = 100,nullable = false)
    private String name;

    @NotNull
    @Column(length = 10, nullable = false)
    @Convert(converter = CategoryConverter.class)
    private Category category;


    @NotNull
    @Column(length = 10, nullable = false)
    @Convert(converter = StatusConverter.class)
    private Status status = Status.ACTIVE;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy ="course" )
    //@JoinColumn(name = "course_id")
    private List<Lesson> lessons = new ArrayList<>();
}
