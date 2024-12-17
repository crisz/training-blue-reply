---
layout: page  
title: Ex4 ~ Test Automatici  
permalink: /esercizi/backend/esercizio4  
parent: Esercizi Backend  
nav_order: 4  
---

# Esercizio 4  

## Test Automatici  
In questo esercizio si affronteranno le **best practice per i test automatizzati** in un'applicazione Spring. L'obiettivo è implementare **Unit Test** utilizzando **JUnit** e **Mockito** e creare **Integration Test** utilizzando **Liquibase** per la gestione delle migrazioni del database.  

## Temi trattati  
JUnit  
{: .label }  

Mockito  
{: .label }  

Integration Test  
{: .label }  

Liquibase  
{: .label }  

## Procedimento  
1. **Implementazione degli Unit Test**  
   - Creare test unitari con **JUnit** per i servizi principali.  
   - Utilizzare **Mockito** per simulare le dipendenze.  

2. **Implementazione degli Integration Test**  
   - Configurare Liquibase per gestire il database di test.  
   - Creare test di integrazione per verificare il funzionamento dei servizi con il database.  

3. **Esecuzione dei test**  
   - Assicurarsi che tutti i test passino correttamente.  

## Domande  
- Come si utilizza **Mockito** per simulare le dipendenze nei test unitari?  
- Qual è il ruolo di **Liquibase** nei test di integrazione?  
- Come si configurano i contesti Spring per l’esecuzione dei test automatici?  

## Risoluzione  
<details>  
  <summary>Visualizza soluzione</summary>  
  <ol>  
    <li>  
      **Configurazione degli Unit Test con JUnit e Mockito**  
      - Esempio di test unitario per un servizio con una dipendenza mockata:  
      ```java  
      @ExtendWith(MockitoExtension.class)  
      class EventServiceTest {  

          @Mock  
          private EventRepository eventRepository;  

          @InjectMocks  
          private EventService eventService;  

          @Test  
          void testCreateEvent() {  
              Event event = new Event("Evento1", "Luogo1");  
              when(eventRepository.save(any(Event.class))).thenReturn(event);  

              Event result = eventService.createEvent(event);  

              assertNotNull(result);  
              assertEquals("Evento1", result.getName());  
              verify(eventRepository, times(1)).save(event);  
          }  
      }  
      ```  
    </li>  

    <li>  
      **Configurazione di Liquibase per i test di integrazione**  
      - Aggiungere dipendenze al `pom.xml`:  
      ```xml  
      <dependency>  
          <groupId>org.liquibase</groupId>  
          <artifactId>liquibase-core</artifactId>  
      </dependency>  
      ```  
      - Configurare `application-test.yml`:  
      ```yaml  
      spring:  
        datasource:  
          url: jdbc:h2:mem:testdb  
          driver-class-name: org.h2.Driver  
          username: sa  
          password:  
        liquibase:  
          change-log: classpath:db/changelog/changelog-master.xml  
      ```  
    </li>  

    <li>  
      **Creazione di un Integration Test**  
      - Esempio di test di integrazione con SpringBootTest e Liquibase:  
      ```java  
      @SpringBootTest  
      @AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)  
      @TestPropertySource(locations = "classpath:application-test.yml")  
      class EventIntegrationTest {  

          @Autowired  
          private MockMvc mockMvc;  

          @Test  
          void testCreateEventIntegration() throws Exception {  
              String eventJson = "{ \"name\": \"Evento1\", \"place\": \"Luogo1\" }";  

              mockMvc.perform(post("/event")  
                      .contentType(MediaType.APPLICATION_JSON)  
                      .content(eventJson))  
                  .andExpect(status().isOk())  
                  .andExpect(jsonPath("$.name").value("Evento1"));  
          }  
      }  
      ```  
    </li>  

    <li>  
      **Esecuzione dei test**  
      - Eseguire i test utilizzando Maven
