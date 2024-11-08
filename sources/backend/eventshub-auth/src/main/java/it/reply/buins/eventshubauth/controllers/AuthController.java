package it.reply.buins.eventshubauth.controllers;

import it.reply.buins.eventshubauth.entities.UserEntity;
import it.reply.buins.eventshubauth.exceptions.AuthException;
import it.reply.buins.eventshubauth.models.AuthRequest;
import it.reply.buins.eventshubauth.models.AuthResponse;
import it.reply.buins.eventshubauth.models.SignUpRequest;
import it.reply.buins.eventshubauth.services.AuthService;
import it.reply.buins.eventshubauth.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@Controller
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public AuthResponse signUp(
        @RequestBody SignUpRequest signUpRequest
    ) throws AuthException {

        authService.save(signUpRequest);
        return AuthResponse.builder().username(signUpRequest.getUsername()).build();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody AuthRequest authRequest
    ) throws AuthException {
        UserEntity user = authService.login(authRequest);
        HttpHeaders headers = new HttpHeaders();
        String jwt = JwtUtils.generateToken(user.getUsername(), user.getId());
        headers.add(HttpHeaders.SET_COOKIE, "JWT=" + jwt + "; HttpOnly; Path=/; SameSite=None; Secure;");
        return ResponseEntity.ok().headers(headers).body(AuthResponse
                .builder()
                .username(user.getUsername())
                .id(user.getId())
                .build());
    }
}