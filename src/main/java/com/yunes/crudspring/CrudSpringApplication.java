package com.yunes.crudspring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.yunes.crudspring.enums.Category;
import com.yunes.crudspring.model.Course;
import com.yunes.crudspring.model.Lesson;
import com.yunes.crudspring.repository.CourseRepository;

@SpringBootApplication
public class CrudSpringApplication {
	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(CourseRepository courseRepository){
		return args -> {
			courseRepository.deleteAll();

			Course c = new Course();
			c.setName("Angular com Spring");
			c.setCategory(Category.FRONT_END);
			
			Lesson l = new Lesson();
			l.setName("Introdução");
			l.setYoutubeUrl("01234567891011");
			l.setCourse(c);
			c.getLessons().add(l);

			Lesson l1 = new Lesson();
			l1.setName("Angular");
			l1.setYoutubeUrl("01234567891012");
			l1.setCourse(c);
			c.getLessons().add(l1);
			courseRepository.save(c);
		};
	}
}