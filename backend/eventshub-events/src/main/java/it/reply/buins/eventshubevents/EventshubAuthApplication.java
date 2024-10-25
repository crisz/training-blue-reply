package it.reply.buins.eventshubevents;

import it.reply.buins.eventshubevents.entities.EventEntity;
import it.reply.buins.eventshubevents.repositories.EventsRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@SpringBootApplication
public class EventshubAuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventshubAuthApplication.class, args);
	}

	@Autowired
	private EventsRepository eventsRepository;

	@PostConstruct
	public void initDb() throws IOException {
		// For testing purposes only
		// Not for

		for (int i=1; i<=10; i++) {
			EventEntity event = new EventEntity();
			event.setTitle("Example event " + i);
			event.setDescription("This is a default event used as an example. It has been automatically created by the server");
			event.setId(999L + i);
			event.setPlace("Nowhere");
			event.setParticipants(List.of());
			event.setImageUrl("https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png");
			event.setStartDate(new java.sql.Date(1704067200000L));
			event.setStartDate(new java.sql.Date(1704153600000L));

			eventsRepository.save(event);
		}

	}

	public static MultipartFile getPlaceholderImage() throws IOException {
		ClassPathResource resource = new ClassPathResource("images/placeholder.png");
		InputStream inputStream = resource.getInputStream();

		return new MockMultipartFile(
				"image",                   // field name
				"placeholder.png",         // original file name
				"image/png",               // content type
				StreamUtils.copyToByteArray(inputStream)  // file content as byte array
		);
	}

}
