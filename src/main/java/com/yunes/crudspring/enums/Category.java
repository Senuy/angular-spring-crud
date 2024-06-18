package com.yunes.crudspring.enums;

public enum Category {
    BACK_END("Back-End"), FRONT_END("Front-End");

    private String value;

    Category(String value) {
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
