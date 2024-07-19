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
public class EventMultiPartPayloadDto {
    private Long id;
    private String title;
    private String description;
    private String place;
    private MultipartFile image;
    public EventEntity toEntity(String imageUrl, Long userId) {
        if (this.id != null) {
            return new EventEntity(id, title, description, place, imageUrl, userId);
        }
        return new EventEntity(null, title, description, place, imageUrl, userId);
    }
}
