package com.mgu.mlnba.security;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {
    @NotEmpty
    @Size(min = 1, max = 50)
    private String username;

    @NotEmpty
    private String password;

}
