package com.mgu.mlnba.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Match")
public class Match {

    @Id
    protected String id;
    
    private String date;
    private String time;
    private String opponent;
    
    @DBRef
    private TeamGroup localTeam;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getOpponent() {
        return opponent;
    }

    public void setOpponent(String opponent) {
        this.opponent = opponent;
    }

    public TeamGroup getLocalTeam() {
        return localTeam;
    }

    public void setLocalTeam(TeamGroup localTeam) {
        this.localTeam = localTeam;
    }
    
    
}
