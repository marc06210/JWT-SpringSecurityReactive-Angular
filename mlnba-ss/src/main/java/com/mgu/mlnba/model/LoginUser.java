package com.mgu.mlnba.model;

import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginUser {

    private String username;
    private String lastname;
    private String firstname;
    
    private List<String> roles;

    public LoginUser(Member member) {
        this.username = member.getUsername();
        this.lastname = member.getLastname();
        this.firstname = member.getFirstname();
        this.roles = member.getRoles().stream()
                .map(Role::toString)
                .collect(Collectors.toList());
    }
}
