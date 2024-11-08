package it.reply.buins.eventshubauth.exceptions;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class AuthException extends Exception {
    public enum Reason {
        USER_NOT_FOUND("Could not find any user with the given username"),
        INVALID_LOGIN("Username and password do not match"),

        ALREADY_EXISTING_USERNAME("Username already used"),

        ALREADY_EXISTING_EMAIL("Email already used");
        // TODO: sarebbe meglio non dare informazioni riguardo la presenza di username
        private String message;
        Reason(String message) {
            this.message = message;
        }


    }

    private Reason reason;
    public AuthException(Reason reason) {
        super(reason.message);
        this.reason = reason;
    }
}
