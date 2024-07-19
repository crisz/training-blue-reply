package it.reply.buins.eventshubevents.services;

import it.reply.buins.eventshubevents.dto.EventMultiPartPayloadDto;
import it.reply.buins.eventshubevents.dto.EventResponseDto;
import it.reply.buins.eventshubevents.entities.EventEntity;
import it.reply.buins.eventshubevents.repositories.EventsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import static it.reply.buins.eventshubevents.utils.Constants.UPLOAD_FOLDER;

@Service
public class EventsService {
    private final EventsRepository repository;

    @Autowired
    public EventsService(EventsRepository repository) {
        this.repository = repository;
    }


    public EventResponseDto createEvent(EventMultiPartPayloadDto eventFromFe) {
        String imageUrl = uploadFile(eventFromFe.getImage());
        EventEntity eventEntity = eventFromFe.toEntity(imageUrl);
        return EventResponseDto.fromEntity(repository.save(eventEntity));
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
            return newFilename;
        } catch (IOException e) {
            throw new RuntimeException("Could not upload file: " + e.getMessage());
        }
    }
}