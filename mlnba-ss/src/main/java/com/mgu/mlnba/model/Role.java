package com.mgu.mlnba.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
public class Role implements GrantedAuthority {
    
    private static final long serialVersionUID = 3534347578593400495L;
    
    @Id
    private String id;

    @Override
    public String getAuthority() {
        return id;
    }
    
    public String toString() {
        return id;
    }
}