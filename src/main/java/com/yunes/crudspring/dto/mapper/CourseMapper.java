package com.yunes.crudspring.dto.mapper;

import org.springframework.stereotype.Component;

import com.yunes.crudspring.dto.CourseDTO;
import com.yunes.crudspring.enums.Category;
import com.yunes.crudspring.model.Course;

@Component
public class CourseMapper {

    public CourseDTO toDTO(Course course) {
        if (course == null) {
            return null;
        }
        return new CourseDTO(course.getId(), course.getName(),course.getCategory().getValue(),
        course.getLessons());

    }

    public Course toEntity(CourseDTO courseDTO) {

        if (courseDTO == null) {
            return null;
        }

        Course course = new Course();
        if (courseDTO.id() != null) {
            course.setId(courseDTO.id());
        }
        course.setName(courseDTO.name());
        //TODO : use a mapper for Category
        course.setCategory(convertCategoryValue(courseDTO.category()));
        return course;
    }

    public Category convertCategoryValue(String value) {
        if (value == null){
            return null;
        }
        return switch (value) {
            case  "Front-End"-> Category.FRONT_END;
            case  "Back-End" -> Category.BACK_END;
            default -> throw new IllegalStateException("Categoria invalida: "+ value);
        };

    }

}
