package it.reply.buins.eventshubauth;

import it.reply.buins.eventshubauth.entities.UserEntity;
import it.reply.buins.eventshubauth.exceptions.AuthException;
import it.reply.buins.eventshubauth.models.SignUpRequest;
import it.reply.buins.eventshubauth.repositories.UserRepository;
import it.reply.buins.eventshubauth.services.AuthService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EventshubAuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventshubAuthApplication.class, args);
	}

	@Autowired
	private AuthService service;

	@PostConstruct
	public void initDb() throws AuthException {
		// For testing purposes only
		// Not for production

		SignUpRequest user = new SignUpRequest();
		user.setEmail("user@user.it");
		user.setUsername("user");
		user.setPassword("password");

		service.save(user);
	}
}
