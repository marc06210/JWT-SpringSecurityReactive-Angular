package com.mgu.mlnba.model;

public class GameEvent {
    
    protected String division;
    protected String number;
    protected String equipe1;
    protected String equipe2;
    protected String date;
    protected String time;
    protected String place;
    
    public GameEvent() {
        super();
    }
    
    public GameEvent(String division, String number, String equipe1, String equipe2, String date, String time,
            String place) {
        super();
        this.division = division.replaceAll("\"" , " ").trim();
        this.number = number.replaceAll("\"" , " ").trim();
        this.equipe1 = equipe1.replaceAll("\"" , " ").trim();//.replaceAll("MANDELIEU LA NAPOULE BASKET AVENIR", "MLNBA").trim();
        this.equipe2 = equipe2.replaceAll("\"" , " ").trim();//replaceAll("MANDELIEU LA NAPOULE BASKET AVENIR", "MLNBA").trim();
        this.date = date.replaceAll("\"" , " ").replaceAll("/", "-").trim();
        this.time = time.replaceAll("\"" , " ").trim();
        this.place = place.replaceAll("\"" , " ").trim();
    }
    public String getDivision() {
        return division;
    }
    public void setDivision(String division) {
        this.division = division;
    }
    public String getNumber() {
        return number;
    }
    public void setNumber(String number) {
        this.number = number;
    }
    public String getEquipe1() {
        return equipe1;
    }
    public void setEquipe1(String equipe1) {
        this.equipe1 = equipe1;
    }
    public String getEquipe2() {
        return equipe2;
    }
    public void setEquipe2(String equipe2) {
        this.equipe2 = equipe2;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public String getTime() {
        return time;
    }
    public void setTime(String time) {
        this.time = time;
    }
    public String getPlace() {
        return place;
    }
    public void setPlace(String place) {
        this.place = place;
    }
    
    public String toString() {
        return String.format("le '%s' à '%s': match niveau '%s' entre '%s' et '%s'", 
                date, time, division, equipe1, equipe2);
    }
    
    public boolean isValid() {
        return equipe1!=null && equipe2!=null && date!=null && division!=null;
    }

}
