package com.yunes.crudspring.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.yunes.crudspring.model.Lesson;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record  CourseDTO(
    @JsonProperty("_id") Long id,
    @NotBlank @NotNull @Size( min = 5, max = 100)String name,
    @NotNull @Size(max = 10) @Pattern(regexp = "Back-End|Front-End") String category,
    List<Lesson> lessons) {
}
