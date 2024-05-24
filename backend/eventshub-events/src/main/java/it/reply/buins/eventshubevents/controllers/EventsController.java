package it.reply.buins.eventshubevents.controllers;

import it.reply.buins.eventshubevents.exceptions.AuthException;
import it.reply.buins.eventshubevents.models.AuthResponse;
import it.reply.buins.eventshubevents.models.SignUpRequest;
import it.reply.buins.eventshubevents.services.EventsService;
import it.reply.buins.eventshubevents.utils.JwtUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@Controller
@RequestMapping("/events")
public class EventsController {
    @Autowired
    private EventsService authService;

    @GetMapping("")
    public AuthResponse getAllEvents(
        HttpServletRequest request
    ) throws AuthException {
        String token = getTokenFromCookies(request.getCookies());
        return AuthResponse.builder().username(JwtUtils.getUsernameFromToken(token)+JwtUtils.getUserIdFromToken(token)).build();
    }

    private String getTokenFromCookies(Cookie[] cookies) {
        if (cookies == null) return null;
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("JWT")) {
                return cookie.getValue();
            }
        }
        return null;
    }
}
