package it.reply.buins.eventshubauth.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller("/")
public class AuthController {
    @GetMapping("/auth")
    public String performLogin() {
        return "hello world";
    }
}
