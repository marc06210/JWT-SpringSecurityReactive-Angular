package com.mgu.mlnba.model;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection="opponentteams")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpponentTeam {

    @Id
    protected String id;

    protected String description;

}