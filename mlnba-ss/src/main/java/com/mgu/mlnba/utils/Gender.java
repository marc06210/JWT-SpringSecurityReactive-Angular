package com.mgu.mlnba.utils;

public enum Gender {
    MALE("M"),
    FEMALE("F");
    
    private String name = "";
    
    //Constructeur
    Gender(String name){
      this.name = name;
    }
     
    public String toString(){
      return name;
    }
}
