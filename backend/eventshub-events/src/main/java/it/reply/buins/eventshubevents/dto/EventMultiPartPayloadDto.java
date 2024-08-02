package it.reply.buins.eventshubevents.dto;

import it.reply.buins.eventshubevents.entities.EventEntity;
import it.reply.buins.eventshubevents.entities.EventParticipant;
import it.reply.buins.eventshubevents.entities.EventParticipantPk;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventMultiPartPayloadDto {
    private Long id;
    private String title;
    private String description;
    private String place;
    private MultipartFile image;
    public EventEntity toEntity(String imageUrl, Long userId) {
        if (this.id != null) {
            return new EventEntity(id, title, description, place, imageUrl, userId, new LinkedList<>());
        }
        return new EventEntity(null, title, description, place, imageUrl, userId, new LinkedList<>());
    }
}
