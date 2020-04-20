package com.mgu.mlnba.model;

import java.util.List;
import java.util.stream.Collectors;

public class LoginUser {

    private String id;
    private String username;
    private String lastname;
    private String firstname;

    private List<String> roles;

    public LoginUser(Member member) {
        this.id = member.getId();
        this.username = member.getUsername();
        this.lastname = member.getLastname();
        this.firstname = member.getFirstname();
        this.roles = member.getRoles().stream().map(Role::toString).collect(Collectors.toList());
    }

    public LoginUser() {
    }

    public LoginUser(String id, String username, String lastname, String firstname, List<String> roles) {
        super();
        this.id = id;
        this.username = username;
        this.lastname = lastname;
        this.firstname = firstname;
        this.roles = roles;
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

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

}
