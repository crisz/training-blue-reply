---
layout: page  
title: Ex2 ~ Geocoding con RestTemplate  
permalink: /esercizi/backend/esercizio2  
parent: Esercizi Backend  
nav_order: 2  
---

# Esercizio 2  

## Geocoding con RestTemplate  
In questo esercizio verrà implementata una funzionalità di **geocoding** durante la creazione di un evento. Sarà necessario ottenere informazioni su **longitudine** e **latitudine** a partire da un campo "luogo" utilizzando un servizio esterno tramite **RestTemplate**. Le informazioni recuperate verranno salvate nel database e restituite al Frontend tramite il servizio GET.  

## Temi trattati  
RestTemplate  
{: .label }  

MapStruct  
{: .label }  

JPA  
{: .label }  

Geocoding  
{: .label }  

## Procedimento  
1. **Creazione del servizio di geocoding**  
   - Endpoint esistente: `POST /event`  
   - Integrare un servizio esterno (Mockaroo) per ottenere la **longitudine** e la **latitudine** a partire dal campo "place".  

2. **Persistenza delle coordinate nel DB**  
   - Salvare le informazioni di longitudine e latitudine nella tabella `event`.  

3. **Modifica del servizio GET**  
   - Endpoint esistente: `GET /events`  
   - Restituire le coordinate "longitudine" e "latitudine" insieme agli altri dati dell'evento.  

4. **Configurazione MapStruct**  
   - Utilizzare MapStruct per mappare i dati ricevuti dal servizio esterno e integrarli nell'Entity `Event`.  

## Domande  
- Come si utilizza RestTemplate per effettuare chiamate HTTP a un servizio esterno?  
- Come si implementa una mappatura tra DTO ed Entity utilizzando MapStruct?  
- Qual è il ruolo di Mockaroo nella generazione dei dati di test?  

## Risoluzione  
<details>  
  <summary>Visualizza soluzione</summary>  
  <ol>  
    <li>  
      **Creazione del servizio di geocoding tramite RestTemplate**  
      - Configurare il metodo per chiamare il servizio Mockaroo:  
      ```java  
      @Service  
      public class GeocodingService {  
          private final RestTemplate restTemplate = new RestTemplate();  

          public Coordinates getCoordinates(String place) {  
              String url = "https://api.mockaroo.com/api/geo?place=" + place;  
              return restTemplate.getForObject(url, Coordinates.class);  
          }  
      }  

      public class Coordinates {  
          private Double longitude;  
          private Double latitude;  
          // Getters e Setters  
      }  
      ```  
    </li>  

    <li>  
      **Modifica dell'Entity `Event`**  
      - Aggiungere i campi per longitudine e latitudine:  
      ```java  
      @Entity  
      public class Event {  
          @Id  
          @GeneratedValue(strategy = GenerationType.IDENTITY)  
          private Long id;  
          private String place;  
          private Double longitude;  
          private Double latitude;  
          // Getters e Setters  
      }  
      ```  
    </li>  

    <li>  
      **Modifica del servizio POST**  
      - Ottenere le coordinate e salvarle a DB:  
      ```java  
      @RestController  
      @RequestMapping("/event")  
      public class EventController {  
          @Autowired  
          private GeocodingService geocodingService;  

          @Autowired  
          private EventRepository eventRepository;  

          @PostMapping  
          public ResponseEntity<Event> createEvent(@RequestBody Event event) {  
              Coordinates coordinates = geocodingService.getCoordinates(event.getPlace());  
              event.setLongitude(coordinates.getLongitude());  
              event.setLatitude(coordinates.getLatitude());  
              eventRepository.save(event);  
              return ResponseEntity.ok(event);  
          }  
      }  
      ```  
    </li>  

    <li>  
      **Modifica del servizio GET**  
      - Restituire i campi `longitude` e `latitude` nel payload della risposta:  
      ```java  
      @GetMapping("/events")  
      public List<Event> getAllEvents() {  
          return eventRepository.findAll();  
      }  
      ```  
    </li>  

    <li>  
      **Configurazione di MapStruct**  
      - Creare un mapper per trasformare il DTO in Entity:  
      ```java  
      @Mapper(componentModel = "spring")  
      public interface EventMapper {  
          Event toEntity(EventDto dto);  
          EventDto toDto(Event event);  
      }  
      ```  
    </li>  

    <li>  
      **Dati di test con Mockaroo**  
      - Creare un set di dati su Mockaroo che includa **place**, **longitude** e **latitude** per simulare la risposta del servizio di geocoding.  
    </li>  
  </ol>  
</details>  
