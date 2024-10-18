package it.reply.buins.eventshubevents.dto;

import it.reply.buins.eventshubevents.entities.EventEntity;
import it.reply.buins.eventshubevents.entities.EventParticipant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.LinkedList;
import java.util.List;
import java.sql.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventMultiPartPayloadDto {

    private Long id;
    private String title;
    private String description;
    private String place;
    private MultipartFile image;  // MultipartFile for the image

    // List of participants, if relevant
    private List<EventParticipant> participants = new LinkedList<>();

    public EventEntity toEntity(String imageUrl, Long userId) {
        Date startDate = new Date(System.currentTimeMillis()); // Oppure la data corretta
        Date endDate = new Date(System.currentTimeMillis());   // Oppure la data corretta
        List<EventParticipant> participants = this.participants != null ? this.participants : new LinkedList<>();

        if (this.id != null) {
            return new EventEntity(id, title, description, place, imageUrl, userId, startDate, endDate, participants);
        }

        return new EventEntity(null, title, description, place, imageUrl, userId, startDate, endDate, participants);
    }
}
