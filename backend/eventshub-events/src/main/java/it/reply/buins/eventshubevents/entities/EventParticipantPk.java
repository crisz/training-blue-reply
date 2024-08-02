package it.reply.buins.eventshubevents.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class EventParticipantPk implements Serializable {
    @Column
    private Long eventId;

    @Column
    private Long userId;
}
