package com.yunes.crudspring.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.yunes.crudspring.exception.RecordNofFoundException;

@RestControllerAdvice
public class ApplicationControllerAdvice {

    @ExceptionHandler(RecordNofFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleNotFoundException(RecordNofFoundException ex ){
        return ex.getMessage();
    }
    
}
