package com.mgu.mlnba.model;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection="teams")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Match {

    @Id
    protected String id;

    protected String competition;

    protected String description;
    
    protected boolean localMatch = true;
    
    protected OpponentTeam opponent;
    
    protected int localScore = 0;
    
    protected int opponentScore = 0;


}