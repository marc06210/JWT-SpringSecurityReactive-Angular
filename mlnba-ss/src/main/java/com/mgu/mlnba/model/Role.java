package com.mgu.mlnba.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;

@Document
public class Role implements GrantedAuthority {

    private static final long serialVersionUID = 3534347578593400495L;

    @Id
    private String id;

    @Override
    public String getAuthority() {
        return id;
    }

    public Role() {

    }

    public Role(String id) {
        super();
        this.id = id;
    }

    public String toString() {
        return id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}