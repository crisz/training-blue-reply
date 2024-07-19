package it.reply.buins.eventshubevents.repositories;

import it.reply.buins.eventshubevents.entities.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventsRepository extends JpaRepository<EventEntity, Long> {
    List<EventEntity> findAllByUserId(Long userId);
}
