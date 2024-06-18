package com.yunes.crudspring.enums;

public enum Status {
    ACTIVE("Ativo"), INACTIVE("Inativo");

    private String value;

    Status(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
    //to string
    @Override
    public String toString() {
        return value;
    }

}
