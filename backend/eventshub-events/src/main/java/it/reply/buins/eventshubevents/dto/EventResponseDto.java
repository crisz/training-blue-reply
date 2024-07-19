package it.reply.buins.eventshubevents.dto;

import it.reply.buins.eventshubevents.entities.EventEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

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

    public static EventResponseDto fromEntity(EventEntity entity) {
        return new EventResponseDto(entity.getId(), entity.getTitle(), entity.getDescription(), entity.getPlace(), entity.getImageUrl());
    }
}
