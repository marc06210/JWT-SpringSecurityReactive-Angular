package com.mgu.mlnba.model;



import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection="teams")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Team {

        @Id
    protected String id;

    protected String name;
    protected String season;

    protected String description;
    
    @Builder.Default()
    @DBRef
    protected List<Member> members = new ArrayList<>();

}