package it.reply.buins.eventshubevents.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "event_participant")
public class EventParticipant {
    @EmbeddedId
    public EventParticipantPk pk;

    @ManyToOne
    @MapsId("eventId")
    @JoinColumn(name = "id")
    public EventEntity event;
}
