package it.reply.buins.eventshubevents.repositories;

import it.reply.buins.eventshubevents.entities.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventsRepository extends JpaRepository<EventEntity, Long> {

}
