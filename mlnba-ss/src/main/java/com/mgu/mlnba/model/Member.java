package com.mgu.mlnba.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "persons")
public class Member {

    @Id
    protected String id;

    @Indexed(unique=true)
    protected String username;
    protected String password;

    protected String lastname;
    protected String firstname;

    // @Builder.Default()
    @DBRef
    protected List<Role> roles = new ArrayList<>();

    public Member() {

    }

    public Member(String id, String username, String password, String lastname, String firstname, List<Role> roles) {
        super();
        this.id = id;
        this.username = username;
        this.password = password;
        this.lastname = lastname;
        this.firstname = firstname;
        this.roles = roles;
    }

    static public Member getCopyNoPassword(Member m) {
        return new Member(m.id, m.username, null, m.lastname, m.firstname, m.roles);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

}