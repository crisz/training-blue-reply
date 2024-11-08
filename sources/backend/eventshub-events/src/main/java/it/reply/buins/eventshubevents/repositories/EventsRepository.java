package it.reply.buins.eventshubevents.repositories;

import it.reply.buins.eventshubevents.entities.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventsRepository extends JpaRepository<EventEntity, Long> {
    List<EventEntity> findAllByUserId(Long userId);

    @Query("SELECT e FROM EventEntity e JOIN e.participants p WHERE p.pk.userId = :userId")
    List<EventEntity> findAllByParticipating(Long userId);
}
