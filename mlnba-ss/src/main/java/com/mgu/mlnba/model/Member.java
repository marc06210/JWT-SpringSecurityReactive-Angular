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

@Document(collection="persons")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id
    protected String id;

    protected String username;
    protected String password;

    protected String lastname;
    protected String firstname;
    
    @Builder.Default()
    @DBRef
    protected List<Role> roles = new ArrayList<>();
    
    static public Member getCopyNoPassword(Member m) {
        return new Member(m.id, m.username, null, m.lastname, m.firstname, m.roles);
    }

}