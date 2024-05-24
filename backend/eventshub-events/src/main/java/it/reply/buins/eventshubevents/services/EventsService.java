package it.reply.buins.eventshubevents.services;

import it.reply.buins.eventshubevents.entities.EventEntity;
import it.reply.buins.eventshubevents.exceptions.AuthException;
import it.reply.buins.eventshubevents.models.AuthRequest;
import it.reply.buins.eventshubevents.models.SignUpRequest;
import it.reply.buins.eventshubevents.repositories.EventsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EventsService {

    private final EventsRepository repository;

    @Autowired
    public EventsService(EventsRepository repository) {
        this.repository = repository;
    }
}