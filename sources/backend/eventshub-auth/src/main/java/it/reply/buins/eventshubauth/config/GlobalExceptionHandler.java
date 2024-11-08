package it.reply.buins.eventshubauth.config;

import it.reply.buins.eventshubauth.exceptions.AuthException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(AuthException.class)
    public ResponseEntity<String> handleUserNotFoundException(AuthException ex) {
        HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;

        switch (ex.getReason()) {
            case USER_NOT_FOUND -> httpStatus = HttpStatus.NOT_FOUND;
            case ALREADY_EXISTING_USERNAME, ALREADY_EXISTING_EMAIL -> httpStatus = HttpStatus.BAD_REQUEST;
            case INVALID_LOGIN -> httpStatus = HttpStatus.UNAUTHORIZED;
        }

        return new ResponseEntity<>(ex.getMessage(), httpStatus);
    }
}
