package it.reply.buins.eventshubevents.dto;

import it.reply.buins.eventshubevents.entities.EventEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventResponseDto {
    private Long id;
    private String title;
    private String description;
    private String place;
    private String imageUrl;
    private List<Long> participantIds;

    public static EventResponseDto fromEntity(EventEntity entity) {
        return new EventResponseDto(
                entity.getId(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getPlace(),
                entity.getImageUrl(),
                entity.getParticipants().stream().map(it -> it.getPk().getUserId()).collect(Collectors.toList())
        );
    }

    public static List<EventResponseDto> fromEntityList(List<EventEntity> entities) {
        return entities.stream().map(EventResponseDto::fromEntity).collect(Collectors.toList());
    }
}
