package com.mgu.mlnba.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "opponentteams")
public class OpponentTeam {

    @Id
    protected String id;

    protected String description;

}