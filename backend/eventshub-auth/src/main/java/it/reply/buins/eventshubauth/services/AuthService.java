package it.reply.buins.eventshubauth.services;

import it.reply.buins.eventshubauth.entities.UserEntity;
import it.reply.buins.eventshubauth.exceptions.AuthException;
import it.reply.buins.eventshubauth.models.AuthRequest;
import it.reply.buins.eventshubauth.models.SignUpRequest;
import it.reply.buins.eventshubauth.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserEntity save(SignUpRequest signUpRequest) throws AuthException {
        UserEntity userByUsername = repository.findByUsername(signUpRequest.getUsername());
        if (userByUsername != null) {
            throw new AuthException(AuthException.Reason.ALREADY_EXISTING_USERNAME);
        }

        UserEntity userByEmail = repository.findByEmail(signUpRequest.getEmail());
        if (userByEmail != null) {
            throw new AuthException(AuthException.Reason.ALREADY_EXISTING_EMAIL);
        }

        return repository.save(UserEntity
                .builder()
                .email(signUpRequest.getEmail())
                .username(signUpRequest.getUsername())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .build()
        );
    }

    public UserEntity login(AuthRequest authRequest) throws AuthException {
        UserEntity user = repository.findByUsername(authRequest.getUsername());

        if (user == null) {
            throw new AuthException(AuthException.Reason.USER_NOT_FOUND);
        }

        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            throw new AuthException(AuthException.Reason.INVALID_LOGIN);
        }

        return user;
    }
}