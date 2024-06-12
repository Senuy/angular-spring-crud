package com.yunes.crudspring.exception;

public class RecordNofFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public RecordNofFoundException(Long id) {
        super("Curso não encontrado com o id:"+id);
    }
    
}
