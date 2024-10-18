package it.reply.buins.eventshubevents.entities;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.util.LinkedList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "event")
public class EventEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private String place;

    @Column
    private String imageUrl;

    @Column
    private Long userId;

    @Column
    private Date startDate;

    @Column
    private Date endDate;

    // No @Column here, as @OneToMany manages the relationship
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EventParticipant> participants = new LinkedList<>();

    // Add custom constructor without dates
    public EventEntity(Long id, String title, String description, String place, String imageUrl, Long userId, List<EventParticipant> participants) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.place = place;
        this.imageUrl = imageUrl;
        this.userId = userId;
        this.participants = participants != null ? participants : new LinkedList<>();
    }
}
