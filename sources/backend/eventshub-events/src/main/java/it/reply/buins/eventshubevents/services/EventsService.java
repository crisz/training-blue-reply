package it.reply.buins.eventshubevents.services;

import it.reply.buins.eventshubevents.dto.EventRequestDto;
import it.reply.buins.eventshubevents.dto.EventRequestMultipartDto;
import it.reply.buins.eventshubevents.dto.EventResponseDto;
import it.reply.buins.eventshubevents.entities.EventEntity;
import it.reply.buins.eventshubevents.entities.EventParticipant;
import it.reply.buins.eventshubevents.entities.EventParticipantPk;
import it.reply.buins.eventshubevents.repositories.EventParticipantRepository;
import it.reply.buins.eventshubevents.repositories.EventsRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static it.reply.buins.eventshubevents.utils.Constants.UPLOAD_FOLDER;

@Service
public class EventsService {
    private final EventsRepository repository;

    private final EventParticipantRepository participantRepository;

    public EventsService(EventsRepository repository, EventParticipantRepository eventParticipantRepository) {
        this.repository = repository;
        this.participantRepository = eventParticipantRepository;
    }

    public List<EventResponseDto> getAllEvents() {
        return EventResponseDto.fromEntityList(this.repository.findAll());
    }

    public Optional<EventEntity> getEventById(Long id) {
        return this.repository.findById(id);
    }
    public List<EventResponseDto> getMyEvents(Long userId) {
        return EventResponseDto.fromEntityList(this.repository.findAllByUserId(userId));
    }

    public EventResponseDto createEvent(EventRequestMultipartDto eventFromFe, Long userId) {
        String imageUrl = uploadFile(eventFromFe.getImage());
        EventEntity eventEntity = eventFromFe.toEntity(imageUrl, userId);
        EventEntity responseEntity = repository.save(eventEntity);
        return participateToEvent(responseEntity, userId);
    }

    public EventResponseDto createEvent(EventRequestDto eventFromFe, Long userId) {
        String imageUrl = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
        EventEntity eventEntity = eventFromFe.toEntity(imageUrl, userId);
        EventEntity responseEntity = repository.save(eventEntity);
        return participateToEvent(responseEntity, userId);
    }

    private String uploadFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        try {
            File uploadDirFile = new File(UPLOAD_FOLDER);
            if (!uploadDirFile.exists()) {
                boolean successfullyCreatedFolder = uploadDirFile.mkdirs();
                if (!successfullyCreatedFolder) {
                    // throw new RuntimeException("Could not create folder: " + uploadDirFile.getAbsolutePath());
                }
            }
            String uid = UUID.randomUUID().toString();
            String newFilename = uid + "_" + file.getOriginalFilename();
            File uploadFile = new File(UPLOAD_FOLDER + newFilename);
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOAD_FOLDER + newFilename);
            Files.write(path, bytes);
            return "/api/events/image/" +newFilename;
        } catch (IOException e) {
            throw new RuntimeException("Could not upload file: " + e.getMessage());
        }
    }

    public EventResponseDto participateToEvent(EventEntity eventEntity, Long userId) {
        List<EventParticipant> participants = eventEntity.getParticipants();
        participants.add(new EventParticipant(new EventParticipantPk(eventEntity.getId(), userId), eventEntity));
        return EventResponseDto.fromEntity(repository.save(eventEntity));
    }

    public EventResponseDto removeParticipationFromEvent(EventEntity eventEntity, Long userId) {
        List<EventParticipant> participants = eventEntity.getParticipants();
        participants.removeIf(it -> it.getPk().getUserId().equals(userId));
        return EventResponseDto.fromEntity(repository.save(eventEntity));
    }

    public List<EventResponseDto> getParticipatingEvents(Long userId) {
        return EventResponseDto.fromEntityList(this.repository.findAllByParticipating(userId));

    }
}