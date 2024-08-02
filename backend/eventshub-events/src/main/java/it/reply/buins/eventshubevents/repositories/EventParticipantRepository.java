package it.reply.buins.eventshubevents.repositories;

import it.reply.buins.eventshubevents.entities.EventEntity;
import it.reply.buins.eventshubevents.entities.EventParticipant;
import it.reply.buins.eventshubevents.entities.EventParticipantPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventParticipantRepository extends JpaRepository<EventParticipant, EventParticipantPk> {
}
