package com.mgu.mlnba.controller;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @GetMapping("/api/user")
    public Principal user(Principal user) {
        return user;
    }
}
