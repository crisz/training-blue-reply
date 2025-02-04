---
layout: page
title:  Spring Framework
permalink: /teoria/backend/spring
parent: Tecnologie di Backend
---

# Spring Framework

Immagina di avere a che fare con un'applicazione Java davvero complessa, con tanti componenti che devono interagire tra loro. Spring entra in gioco in questo scenario come una delle scelte più affidabili che, grazie al suo approccio modulare, ti aiuta a organizzare il codice in modo chiaro e gestibile. È stato pensato per rendere la vita degli sviluppatori più semplice, eliminando una buona parte del lavoro manuale legato alla configurazione e all'integrazione dei vari componenti dell'applicazione.

Uno degli aspetti più interessanti di Spring è l'inversion of control (IoC) unita alla dependency injection (DI), che vedremo più nel dettaglio in seguito. Questi concetti permettono di evitare di creare e gestire manualmente gli oggetti e i servizi, perché il framework si occupa di “iniettare” automaticamente le dipendenze necessarie in ogni componente. In questo modo, non solo il codice diventa più pulito e modulare, ma anche più facile da testare, dato che ogni parte è disaccoppiata dalle altre.

Spring non si ferma solo a questo. Offre un vasto ecosistema di moduli che coprono diverse esigenze: da Spring MVC per lo sviluppo di applicazioni web, a moduli per la gestione della sicurezza, l'accesso ai dati e persino per l'implementazione di microservizi o architetture reattive (rx -> reactive extension). Quindi, se devi costruire un'applicazione robusta e scalabile, Spring ti fornisce gli strumenti necessari per farlo, senza dover reinventare la ruota ogni volta.

Tuttavia, non è tutto oro quello che luccica. La flessibilità di Spring, se da un lato rappresenta un grande vantaggio, dall'altro può risultare un po' opprimente all'inizio. La curva di apprendimento può essere abbastanza ripida, soprattutto se ci si trova a dover lavorare con configurazioni legacy basate su XML. Anche se le versioni più recenti hanno semplificato la configurazione grazie alle annotazioni e al Java Config, è facile sentirsi sopraffatti dalla quantità di funzionalità e opzioni disponibili. Il troubleshooting può rappresentare una sfida in quanto una configurazione sbagliata può essere difficile da rilevare e correggere.

In sintesi, Spring Framework è come un coltellino svizzero per lo sviluppo di applicazioni Java: estremamente potente e versatile, capace di adattarsi a diverse esigenze, ma che richiede un certo investimento iniziale per sfruttarne appieno tutte le potenzialità. Se impari a conoscere bene i suoi meccanismi, scoprirai che diventerà un alleato indispensabile per costruire sistemi robusti e ben strutturati.

Spring è una famiglia di librerie, una delle librerie più usate per lo sviluppo di API web è Spring Boot

## Spring Boot

Spring Boot è una soluzione che semplifica lo sviluppo di applicazioni Java, costruita sopra il già citato framework Spring. La sua principale caratteristica è la riduzione della configurazione necessaria per far partire un progetto, grazie al principio della “convenzione su configurazione” (in inglese "convention over configuration"). In questo modo, molti settaggi vengono predefiniti, permettendoti di concentrarti più sullo sviluppo della logica dell’applicazione che sulla configurazione tecnica.

Un aspetto centrale di Spring Boot è l’auto-configurazione: all’avvio, il framework analizza l'intero repository alla ricerca di Bean (anche su questo ci tornereremo dopo) e configura automaticamente i componenti necessari, in base alle dipendenze presenti nel progetto. Questo approccio accelera il processo di sviluppo e facilita la transizione da ambiente di sviluppo a quello di produzione.

Spring Boot include anche strumenti utili per il monitoraggio e la gestione dell’applicazione, come l’Actuator, che fornisce informazioni sullo stato e sulle prestazioni del sistema. Sebbene l’auto-configurazione semplifichi notevolmente il lavoro, in situazioni particolari potrebbe essere necessario intervenire manualmente per personalizzare alcune impostazioni.

### Entry point 

L'entry point, come in tutte le applicazioni Java, è il metodo main. In Spring Boot la classe che implementa il main è di rilievo, in quanto viene configurato in questo punto il modo in cui l'applicazione deve avviarsi.

Un esempio di main è il seguente:

```java
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,
    HibernateJpaAutoConfiguration.class
})
@ComponentScan( value = {
	"com.mycompany.myapp", // package del progetto corrente
	"com.mycompany.mylibrary" // package dipendenza
})
public class MyApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(MyApplciation.class, args);
	}

	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(MyApplciation.class);
    }
}
```

In questo esempio, la classe definisce il punto di ingresso di una applicazione Spring Boot e ne controlla alcune configurazioni. L'annotazione `@SpringBootApplication` agisce come scorciatoia per combinare le annotazioni di configurazione, auto-configurazione e component scanning, ma qui viene usata con l'attributo exclude per disattivare le configurazioni automatiche relative al datasource e a Hibernate JPA. Questo significa che la gestione del database verrà configurata manualmente o non sarà necessaria.

L'annotazione `@ComponentScan` specifica i package in cui Spring deve cercare i componenti (bean), includendo sia il package principale dell'applicazione che quello di una dipendenza.

Estendere SpringBootServletInitializer permette di configurare l'applicazione per il deploy su un server servlet tradizionale, mentre il metodo main avvia l'applicazione in modalità stand-alone. Infine, il metodo configure assicura che, quando l'applicazione viene avviata in un contesto servlet, venga utilizzata la stessa configurazione definita nella classe principale.

Grazie all'annotazione `@SpringBootApplication`, l'intera applicazione viene riconosciuta come un'applicazione Spring Boot. Ma affinché possa fare qualcosa, è necessario definire un controller.

### Controller
In un'applicazione Spring Boot, il controller rappresenta il primo elemento per la gestione delle richieste HTTP. È una classe che riceve le richieste dal client, elabora eventuali parametri, delega la logica al service e infine restituisce una risposta.

Per fare ciò, la classe e i metodi devono essere annotati con determinate keyword:

- **@Controller:**

    Questa annotazione indica che la classe è un controller nell'ambito di Spring MVC. Il suo compito principale è quello di mappare le richieste HTTP ai metodi corrispondenti e, di solito, restituire il nome di una view da rendere.

  Esempio:

  ```java
   @Controller
    public class MyViewController {
        @GetMapping("/home")
        public String home(Model model) {
            model.addAttribute("message", "Benvenuto!");
            return "home"; // Nome della view (es. home.html)
        }
    }
    ```

- **@ResponseBody**:


    Quando applicata a un metodo (o a livello di classe), questa annotazione indica che il valore restituito dal metodo deve essere scritto direttamente nel body della risposta HTTP, anziché essere interpretato come il nome di una view. È particolarmente utile per creare API REST che restituiscono dati in formato JSON o XML.

    Esempio:

    ```java
    @Controller
    public class MyApiController {
        @GetMapping("/data")
        @ResponseBody
        public DataDTO getData() {
            return new DataDTO("Esempio");
        }
    }
    ```

- **@RestController:**:

    È una scorciatoia che combina @Controller e @ResponseBody. Usando @RestController, ogni metodo della classe restituisce direttamente il contenuto (es. JSON) nel body della risposta, senza dover aggiungere @ResponseBody ad ogni metodo.

    Esempio:

    ```java
    @RestController
    public class MyRestController {
        @GetMapping("/api/info")
        public InfoDTO getInfo() {
            return new InfoDTO("Informazione utile");
        }
    }
    ```
Un controller in Spring Boot è il punto iniziale in cui il framework riceve le richieste HTTP. Questo lo rende fondamentale per l'interazione client-server. 

Il controller:

1. Riceve la richiesta: Mappa l'URL e il metodo HTTP (GET, POST, ecc.) a un metodo specifico.
2. Elabora i parametri: Utilizza annotazioni come @PathVariable e @RequestParam per estrarre dati dall'URL o dalla query string.
3. Delegazione: Spesso delega la logica di business a un service, mantenendo il controller focalizzato sulla gestione della comunicazione.
4. Restituisce la risposta: Grazie a @ResponseBody o @RestController, la risposta viene serializzata (es. in JSON) e inviata al client.

Affinché vengono riconosciuti tutti gli elementi di una richiesta, come query param, path param, e così via, possono essere utili altre annotazioni a livello di parametro:

- **@PathVariable**:
    Questa annotazione serve per estrarre delle variabili direttamente dalla parte dinamica dell'URL. Ad esempio, se l'URL contiene un identificativo di una risorsa (come un ID utente), @PathVariable consente di mappare quel segmento dell'URL a una variabile del metodo.

    Quindi, se ho `GET /user/123`, se voglio ricavare in una variabile la parte dinamica *123*, posso usare:

    ```java
    @GetMapping("/users/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable("id") Long userId) {
        UserDTO user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }
    ```

- **@RequestParam**:
    Questa annotazione viene utilizzata per leggere i parametri inviati nella query string dell'URL. È utile quando, ad esempio, si vogliono applicare filtri o ricerche basate su parametri opzionali o obbligatori.

    Se ad esempio sto facendo una richiesta con `GET /users?name=Mario`, se voglio ricavare in una variabile la parte dinamica e opzionale *Mario*, posso usare:

    ```java
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> searchUsers(
            @RequestParam(value = "name", required = false) String name) {
        List<UserDTO> users = userService.findUsersByName(name);
        return ResponseEntity.ok(users);
    }
    ```

    Nel caso in cui venga invocato `GET /users` il metodo verrà invocato ugualmente, ma name sarà valorizzato a `null`.

- **@RequestBody**:
    Questa annotazione converte il contenuto del body della richiesta HTTP in un oggetto Java, deserializzando ad esempio un JSON in un DTO. È utilizzata soprattutto nelle operazioni di creazione o aggiornamento di risorse.

    ```java
    @PostMapping("/users")
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody CreateUserDTO createUserDTO) {
        UserDTO createdUser = userService.createUser(createUserDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
    ```

    In questo caso, il JSON inviato nel body viene convertito in un oggetto CreateUserDTO. L'annotazione @Valid viene usata per attivare la validazione dei dati in ingresso, basata sulle regole definite nel DTO.

- **@RequestHeader**:
    Questa annotazione permette di recuperare i valori degli header della richiesta HTTP. Gli header possono contenere informazioni come token di autenticazione, tipo di contenuto o altre informazioni utili per l’elaborazione della richiesta.

    ```java
    @GetMapping("/profile")
    public ResponseEntity<ProfileDTO> getProfile(@RequestHeader("Authorization") String authToken) {
        ProfileDTO profile = userService.getProfile(authToken);
        return ResponseEntity.ok(profile);
    }
    ```

    Qui l'header Authorization viene estratto e passato al metodo per elaborare la richiesta in base al token fornito.

- **@CookieValue**:
    Utilizzata per estrarre il valore di uno specifico cookie inviato con la richiesta, questa annotazione è utile per ottenere informazioni memorizzate nei cookie, come ad esempio una sessione utente.

    ```java
    @GetMapping("/settings")
    public ResponseEntity<SettingsDTO> getSettings(@CookieValue(value = "sessionId", required = false) String sessionId) {
        SettingsDTO settings = userService.getSettings(sessionId);
        return ResponseEntity.ok(settings);
    }
    ```

    In questo esempio, il valore del cookie sessionId viene automaticamente passato come parametro al metodo.

- **@ModelAttribute**:
    Questa annotazione associa automaticamente i dati della richiesta (solitamente provenienti da form HTML) ad un oggetto Java. Viene usata per il binding dei dati, ossia per popolare un oggetto con i valori dei parametri della richiesta.

    ```java
    @PostMapping("/register")
    public String registerUser(@ModelAttribute UserRegistrationDTO registrationDTO, Model model) {
        userService.register(registrationDTO);
        model.addAttribute("message", "Registrazione completata!");
        return "registrationResult"; // Nome della view da renderizzare
    }
    ```

    Qui i dati inviati da un form vengono mappati direttamente nell’oggetto UserRegistrationDTO, semplificando il trasferimento dei dati dalla richiesta all’applicazione.
 
Quando usare cosa?
    
- Utilizza @PathVariable quando il dato è parte integrante della struttura dell’URL, come un ID che identifica una risorsa.
- Usa @RequestParam per leggere parametri opzionali o obbligatori passati nella query string, ideali per filtri e ricerche.
- Applica @RequestBody quando devi convertire il corpo della richiesta in un oggetto Java, particolarmente per operazioni POST o PUT.
- @RequestHeader e @CookieValue sono utili per accedere a informazioni aggiuntive che non fanno parte dell’URL o del corpo della richiesta, ma sono comunque necessarie per l’elaborazione (come token di autenticazione o informazioni di sessione).
- @ModelAttribute è ideale per il binding automatico dei dati dei form, facilitando il trasferimento dei dati a un oggetto Java che rappresenta il modello.

Utilizzando correttamente queste annotazioni, si garantisce una chiara separazione tra i vari aspetti della gestione delle richieste HTTP, facilitando la manutenzione e l’evoluzione dell’API. Inoltre, questo approccio consente di rispettare le best practice nel design delle applicazioni REST, mantenendo il codice modulare e facilmente testabile.

Di solito, il controller si occupa solo di configurare l'interfaccia verso il front-end e di validare la richiesta, mal la logica di business viene contenuta in un'altra classe detta Service. 

### Service

In Spring, i service rappresentano il livello della logica di business dell'applicazione. Sono responsabili dell'esecuzione delle operazioni principali, come l'elaborazione dei dati, l'applicazione delle regole di business e la coordinazione tra i vari componenti (repository, API, ecc.). In altre parole, mentre il controller si occupa di ricevere e rispondere alle richieste HTTP, i service contengono il “cuore” dell'applicazione, dove avvengono le elaborazioni e le decisioni.

```java

@Service
public class UserService {

    public UserDto getUser(String userId) {
        // Logica per recuperare l'utente...
    }
}

```

Ma facciamo un passo indietro, come colleghiamo il service al controller?

### Dependency Injection e Inversion Of Control

Dependency Injection (DI) e Inversion of Control (IoC) sono due concetti fondamentali per la scrittura di codice modulare e facilmente testabile nelle applicazioni, e sono ampiamente utilizzati in framework come Spring.

- **Inversion of Control (IoC)**

    Il principio di Inversion of Control significa che il controllo del flusso dell'applicazione non è più gestito direttamente dal codice dell'applicazione, ma viene “invertito” e affidato a un contenitore o framework. In altre parole, anziché creare e gestire manualmente le istanze degli oggetti (dipendenze), il framework si occupa di instanziarli e di collegarli insieme. Questo approccio favorisce un design meno accoppiato, in cui i componenti dell'applicazione non hanno conoscenze dirette su come ottenere le loro dipendenze.

- **Dependency Injection (DI)**
    La Dependency Injection è una specifica tecnica per implementare l'IoC. Consiste nel fornire (iniettare) le dipendenze di un componente dall'esterno, piuttosto che farle creare all'interno dello stesso componente. Ad esempio, se una classe A ha bisogno di utilizzare una classe B, anziché A istanziare direttamente B, il framework si occuperà di passare un’istanza di B ad A. In questo modo, A diventa indipendente dalla logica di creazione delle sue dipendenze e risulta più semplice da testare, perché è possibile iniettare versioni fittizie (mock) o alternative di B.

Esempio:

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        UserDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
}
```

Grazie alla Dependency Injection (da notare la keyword @Autowired), il controller non crea direttamente il service, ma riceve un'istanza già configurata dal framework:

**Nota:** potresti trovare l'injection anche attraverso questa sintassi:

```java
    @Autowired
    private final UserService userService;
```

Questo metodo è ugualmente supportato, anche se sconsigliato in quanto meno testabile.

Generalmente un'applicazione Spring Boot si compone di almeno 3 tasselli: il controller, il service e il repository. Ci rimane da vedere quest'ultimo.

### Repository

I repository sono il componente incaricato di gestire l'accesso ai dati all'interno di un'applicazione Spring. Seguono il pattern Repository, che astragga le operazioni di persistenza in modo che il resto dell'applicazione non debba conoscere i dettagli specifici del database o della tecnologia di persistenza usata.

#### Cosa Fa un Repository
- Interfaccia di Accesso ai Dati:
Il repository fornisce metodi per salvare, aggiornare, eliminare e cercare entità nel database. In un'applicazione tipica, la logica di business (contenuta nel service) chiama i metodi del repository per interagire con i dati.

- Astrazione:
Il repository nasconde i dettagli di implementazione del database, consentendo di lavorare con oggetti Java senza occuparsi di SQL, transazioni o altre complessità. Questo favorisce un design pulito e testabile.

- Integrazione con Spring Data:
Utilizzando Spring Data, puoi definire un repository estendendo interfacce predefinite come JpaRepository, CrudRepository o PagingAndSortingRepository. Spring genererà automaticamente l'implementazione in base ai metodi dichiarati nell'interfaccia.

L'annotazione @Repository viene usata per segnare una classe come componente di accesso ai dati.

Supponiamo di avere una entità User. Possiamo definire un repository per questa entità come segue:

```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByName(String name);
}
```

In questo esempio JpaRepository fornisce una serie di metodi già pronti per le operazioni CRUD (create, read, update, delete), così come metodi per il paging e lo sorting.

I repository vengono tipicamente iniettati nei service, che li usano per eseguire le operazioni di persistenza. Ad esempio, in un service potresti avere:

```java
@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return convertToDTO(user);
    }
}
```

