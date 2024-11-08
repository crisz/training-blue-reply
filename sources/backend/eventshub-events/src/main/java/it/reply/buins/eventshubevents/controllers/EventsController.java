package it.reply.buins.eventshubevents.controllers;

import it.reply.buins.eventshubevents.dto.EventMultiPartPayloadDto;
import it.reply.buins.eventshubevents.dto.EventResponseDto;
import it.reply.buins.eventshubevents.entities.EventEntity;
import it.reply.buins.eventshubevents.services.EventsService;
import it.reply.buins.eventshubevents.utils.JwtUtils;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import static it.reply.buins.eventshubevents.utils.Constants.UPLOAD_FOLDER;

@RestController
@Controller
@RequestMapping("/events")
public class EventsController {
    @Autowired
    private EventsService eventsService;

    @Autowired
    private ServletContext servletContext;

    @GetMapping("/all")
    public List<EventResponseDto> getAllEvents() {
        return this.eventsService.getAllEvents();
    }

    @GetMapping
    public List<EventResponseDto> getMyEvents(
            HttpServletRequest request
    ) {
        String token = getTokenFromCookies(request.getCookies());
        Long userId = JwtUtils.getUserIdFromToken(token);
        return this.eventsService.getMyEvents(userId);
    }

    @GetMapping("/participating")
    public List<EventResponseDto> getParticipatingEvents(
            HttpServletRequest request
    ) {
        String token = getTokenFromCookies(request.getCookies());
        Long userId = JwtUtils.getUserIdFromToken(token);
        return this.eventsService.getParticipatingEvents(userId);
    }


    @PostMapping
    public EventResponseDto postEvent(
            HttpServletRequest request,
            @ModelAttribute EventMultiPartPayloadDto event
    ) {
        if (event.getTitle() == null) throw new RuntimeException("Title is required");
        if (event.getDescription() == null) throw new RuntimeException("Description is required");
        if (event.getPlace() == null) throw new RuntimeException("Place is required");
        String token = getTokenFromCookies(request.getCookies());
        Long userId = JwtUtils.getUserIdFromToken(token);

        return eventsService.createEvent(event, userId);
    }


    @PostMapping("/{eventId}/participate")
    public EventResponseDto participateToEvent(
            HttpServletRequest request,
            @PathVariable Long eventId
    ) {
        String token = getTokenFromCookies(request.getCookies());
        Long userId = JwtUtils.getUserIdFromToken(token);

        Optional<EventEntity> event = eventsService.getEventById(eventId);

        if (event.isEmpty()) {
            throw new RuntimeException("The event with id " + eventId + " does not exist");
        }

        return eventsService.participateToEvent(event.get(), userId);
    }

    @GetMapping("/image/{filename}")
    public ResponseEntity<UrlResource> serveFile(@PathVariable String filename) {
        try {
            Path file = Paths.get(UPLOAD_FOLDER).resolve(filename);
            UrlResource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                // Determine the file's content type
                String contentType = Files.probeContentType(file);
                if (contentType == null) {
                    contentType = servletContext.getMimeType(file.toString());
                }
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);

            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    private String getTokenFromCookies(Cookie[] cookies) {
        if (cookies == null) return null;
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("JWT")) {
                return cookie.getValue();
            }
        }
        return null;
    }
}
