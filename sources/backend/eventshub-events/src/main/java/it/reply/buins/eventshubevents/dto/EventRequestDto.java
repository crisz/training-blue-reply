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
import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventRequestDto {

    private Long id;
    private String title;
    private String description;
    private String place;
    private Date startDate;
    private Date endDate;

    // List of participants, if relevant
    private List<EventParticipant> participants = new LinkedList<>();

    public EventEntity toEntity(String imageUrl, Long userId) {
        if (startDate == null) {
            this.startDate = new Date(System.currentTimeMillis());
        }
        if (endDate == null) {
            this.endDate = new Date(System.currentTimeMillis());
        }
        List<EventParticipant> participants = this.participants != null ? this.participants : new LinkedList<>();

        if (this.id != null) {
            return new EventEntity(id, title, description, place, imageUrl, userId, startDate, endDate, participants, Set.of());
        }

        return new EventEntity(null, title, description, place, imageUrl, userId, startDate, endDate, participants, Set.of());
    }
}
