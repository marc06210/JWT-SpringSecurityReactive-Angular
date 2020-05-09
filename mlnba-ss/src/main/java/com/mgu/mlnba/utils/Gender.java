package com.mgu.mlnba.utils;

public enum Gender {
    MALE("Garçon"),
    FEMALE("Fille");
    
    private String name = "";
    
    //Constructeur
    Gender(String name){
      this.name = name;
    }
     
    public String toString(){
      return name;
    }
}
