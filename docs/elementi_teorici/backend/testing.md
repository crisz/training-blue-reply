---
layout: page
title:  Test Automatizzati
permalink: /teoria/backend/test-automatizzati
parent: Elementi Teorici Backend
---

# Test Automatizzati

I test automatizzati sono una componente essenziale per garantire la qualità e l'affidabilità del software. Attraverso vari tipi di test, possiamo verificare che ogni parte del sistema funzioni correttamente sia in isolamento che in integrazione con altri componenti. In questa guida vedremo i principali tipi di test automatizzati per il backend: Unit Testing, Integration Testing, End-to-end Testing, e Test di Performance e Stress Testing.

## Cosa sono i Test e a Cosa Servono

I **test** sono un processo fondamentale per verificare che il software sviluppato soddisfi i requisiti richiesti e funzioni come previsto. I test automatizzati servono a garantire che il codice sia affidabile e privo di bug, e permettono di individuare eventuali errori in maniera preventiva, evitando che raggiungano l'ambiente di produzione.

I test possono avere diversi scopi, tra cui:
- **Verifica di correttezza**: Assicurarsi che il codice funzioni correttamente.
- **Prevenzione di regressioni**: Identificare problemi introdotti da nuove modifiche al codice.
- **Miglioramento della qualità**: Aumentare la stabilità e la qualità del software grazie a un feedback continuo.

## Tipi di Test Automatizzati

I test automatizzati si dividono in varie categorie in base all'ambito di test e alla granularità:

1. **Unit Testing**: Test delle singole unità di codice (come classi o metodi).
2. **Integration Testing**: Verifica dell'interazione tra più moduli o componenti.
3. **End-to-end Testing**: Test del sistema completo, dall'inizio alla fine, come se fosse utilizzato da un utente.
4. **Test di Performance e Stress Testing**: Valutazione del comportamento del sistema sotto carico, con simulazioni di numerosi utenti.

### Gerarchia dei Test

La gerarchia dei test può essere rappresentata come una **piramide dei test**, che indica la proporzione ideale di ogni tipo di test per garantire la qualità del software:

1. **Unit Testing (base della piramide)**: La maggior parte dei test dovrebbe essere costituita da unit test, in quanto sono veloci, economici e offrono un feedback rapido.
2. **Integration Testing**: Al livello intermedio, questi test garantiscono che i vari componenti funzionino correttamente insieme.
3. **End-to-end Testing (cima della piramide)**: I test E2E sono più lenti e costosi, quindi dovrebbero essere limitati a coprire i flussi principali dell'applicazione.
4. **Test di Performance e Stress Testing**: Questi test possono essere eseguiti periodicamente per assicurare che il sistema continui a funzionare correttamente sotto carico.

## Unit Testing

### **JUnit e Mockito**

L'**Unit Testing** è il processo di testare singole unità di codice, come metodi o classi, per garantire che si comportino come previsto. In Java, gli strumenti più comuni per l'Unit Testing sono **JUnit** e **Mockito**.

- **JUnit**: È una libreria per scrivere e eseguire test unitari in Java. Permette di verificare il comportamento dei singoli metodi e classi, fornendo annotazioni come `@Test` per identificare i metodi di test e `@Before` o `@After` per configurare e pulire l'ambiente di test.

  ```java
  @Test
  public void testCalcolaSomma() {
      int risultato = Calcolatrice.somma(2, 3);
      assertEquals(5, risultato);
  }
  ```

- **Mockito**: È una libreria per il mocking, che consente di creare oggetti fittizi (mock) per simulare il comportamento delle dipendenze durante i test. Questo è utile quando si vogliono isolare le unità di codice dalle loro dipendenze.

  ```java
  @Test
  public void testServizioConMock() {
      ServizioDipendente mockServizio = mock(ServizioDipendente.class);
      when(mockServizio.getDato()).thenReturn("dato simulato");
      
      ClasseSottoTest classe = new ClasseSottoTest(mockServizio);
      String risultato = classe.esegui();
      
      assertEquals("dato simulato elaborato", risultato);
  }
  ```

## Integration Testing

L'**Integration Testing** si concentra sulla verifica dell'interazione tra più componenti del sistema. A differenza dell'Unit Testing, l'obiettivo è garantire che le diverse parti del sistema lavorino insieme in modo corretto.

- Questi test vengono generalmente eseguiti su moduli che hanno dipendenze tra loro, come il database e il servizio di rete.
- In Java, si può usare **Spring Boot Test** per eseguire test di integrazione in contesti di applicazioni Spring. Con annotazioni come `@SpringBootTest`, si può caricare l'intero contesto dell'applicazione e verificare che tutte le parti funzionino insieme.

  ```java
  @SpringBootTest
  public class IntegrazioneTest {
      @Autowired
      private UtenteService utenteService;

      @Test
      public void testCreaUtente() {
          Utente utente = new Utente("Mario", "Rossi");
          Utente salvato = utenteService.salva(utente);
          assertNotNull(salvato.getId());
      }
  }
  ```

## End-to-end Testing

L'**End-to-end (E2E) Testing** verifica il flusso completo dell'applicazione, simulando l'interazione di un utente dal frontend al backend.

- Lo scopo degli E2E test è assicurarsi che tutte le parti del sistema - dal database, al backend, fino al frontend - lavorino insieme come previsto.
- Strumenti come **Selenium** possono essere utilizzati per automatizzare i test del frontend, mentre per il backend si può utilizzare un tool come **Postman** o **Cypress** per simulare le richieste HTTP e verificare la risposta del sistema.

  ```javascript
  describe('Test End-to-End', () => {
      it('Dovrebbe registrare un nuovo utente e loggarsi con successo', () => {
          cy.visit('/register');
          cy.get('input[name="username"]').type('mario_rossi');
          cy.get('input[name="password"]').type('password123');
          cy.get('button[type="submit"]').click();
          
          cy.url().should('include', '/dashboard');
      });
  });
  ```

## Test di Performance e Stress Testing

### **JMeter**

I **Test di Performance** e gli **Stress Testing** vengono utilizzati per valutare il comportamento del sistema sotto carico, garantendo che possa gestire un numero elevato di utenti o richieste senza degrado delle prestazioni.

- **JMeter**: È uno strumento open-source per eseguire test di carico e di performance. JMeter può simulare molteplici utenti che inviano richieste al server per verificare la risposta del sistema sotto diverse condizioni di carico.

  - **Test di Performance**: Si misura il tempo di risposta del sistema sotto un carico normale per verificare se i requisiti di prestazione sono soddisfatti.
  - **Stress Testing**: Il sistema viene portato oltre il carico massimo previsto per verificare come si comporta in condizioni estreme e quali sono i punti di rottura.

  Esempio di configurazione di un test di performance con JMeter:

  - Creare un **Thread Group** che simuli un certo numero di utenti (ad esempio, 100 utenti simultanei).
  - Aggiungere un **HTTP Request Sampler** per definire le richieste che gli utenti invieranno al server.
  - Configurare **Listener** per raccogliere dati come tempi di risposta, throughput, e tassi di errore.

  ```
  Thread Group:
    - Number of Threads (Users): 100
    - Ramp-Up Period (seconds): 10
  HTTP Request Sampler:
    - Server Name or IP: example.com
    - Path: /api/test
  Listener:
    - View Results Tree
    - Summary Report
  ```

## Utilità, Vantaggi e Svantaggi dei Test Automatizzati

### **Utilità**

I test automatizzati garantiscono che il software funzioni correttamente durante tutto il ciclo di sviluppo, riducendo il rischio di errori introdotti durante l'evoluzione del codice. Forniscono inoltre un feedback rapido agli sviluppatori, migliorando l'efficienza del processo di sviluppo.

### **Vantaggi**

- **Qualità del Software**: I test automatizzati aiutano a mantenere una qualità elevata del codice grazie alla verifica continua.
- **Rilevamento Precoce degli Errori**: Identificare e correggere i bug nelle fasi iniziali dello sviluppo riduce i costi di manutenzione.
- **Documentazione del Codice**: I test possono servire come documentazione aggiuntiva per comprendere il comportamento atteso del sistema.
- **Efficienza del Team**: Il feedback immediato riduce il tempo di debug e permette agli sviluppatori di concentrarsi su nuove funzionalità.

### **Svantaggi**

- **Costo Iniziale**: Scrivere test automatizzati richiede tempo e risorse iniziali. Può risultare costoso per piccoli progetti o team con risorse limitate.
- **Manutenzione dei Test**: I test devono essere aggiornati ogni volta che il codice cambia, il che può aggiungere complessità e costi di manutenzione.
- **Falsi Positivi/Negativi**: I test mal progettati possono produrre risultati falsi, sia positivi che negativi, riducendo l'affidabilità dei test stessi.

## Collegamenti Esterni

Per ulteriori approfondimenti, puoi consultare i seguenti collegamenti:

- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/)
- [Mockito Documentation](https://site.mockito.org/)
- [Spring Boot Testing](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing)
- [SeleniumHQ Browser Automation](https://www.selenium.dev/)
- [Apache JMeter](https://jmeter.apache.org/)

## Conclusione

I test automatizzati sono essenziali per mantenere la qualità del software e prevenire regressioni. Gli **Unit Testing** garantiscono che le singole parti del codice funzionino correttamente, gli **Integration Testing** verificano l'interazione tra i moduli, gli **End-to-end Testing** simulano il comportamento dell'utente finale e i **Test di Performance e Stress Testing** assicurano che il sistema funzioni correttamente sotto carico. Utilizzando strumenti come **JUnit**, **Mockito**, **Selenium** e **JMeter**, possiamo costruire un processo di testing completo e affidabile, garantendo che il software risponda alle aspettative degli utenti finali.
