package com.mgu.mlnba.security;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class AuthRequest {
    @NotEmpty
    @Size(min = 1, max = 50)
    private String username;

    @NotEmpty
    private String password;

    public AuthRequest() {
    }

    public AuthRequest(@NotEmpty @Size(min = 1, max = 50) String username, @NotEmpty String password) {
        super();
        this.username = username;
        this.password = password;
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

}
