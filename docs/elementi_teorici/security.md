---
layout: page
title: Elementi di Sicurezza
permalink: /teoria/sicurezza
parent: Elementi Teorici
---
# Introduzione
Nello sviluppo delle applicazioni per i nostri clienti è sempre necessario tenere in mente la sicurezza lungo tutto il ciclo di vita del software: dalla pianificazione al rilascio e per tutto il periodo di manutenzione.
La sicurezza deve essere vista come un elemento integrante dello sviluppo e non come un'attività secondaria da aggiungere a posteriori. Se ti verrà richiesto di sviluppare una nuova funzionalità o di mettere mano a del codice, ricordati di implementare gli elementi di sicurezza basilari, e di comunicare al ciente o ai tuoi responsabili eventuali falle di sicurezza che potrai incontrare nel tuo percorso.

Per maggiori informazioni puoi controllare la pagina Wikipedia di [Security By Design](https://en.wikipedia.org/wiki/Secure_by_design) o la [pagina OWASP dedicata](https://cheatsheetseries.owasp.org/cheatsheets/Secure_Product_Design_Cheat_Sheet.html).
 
## A proposito di OWASP
OWASP (Open Web Application Security Project) è un'organizzazione no-profit internazionale dedicata alla sicurezza delle applicazioni web. Il suo scopo è fornire risorse, strumenti e linee guida gratuite per aiutare sviluppatori, professionisti della sicurezza e aziende a creare, mantenere e migliorare applicazioni sicure.

Uno dei progetti più noti di OWASP è l'OWASP Top Ten, una lista aggiornata periodicamente che identifica le dieci vulnerabilità più critiche delle applicazioni web. Questa classifica serve come riferimento per sviluppatori e organizzazioni, aiutandoli a comprendere e prioritizzare le minacce di sicurezza più comuni, facilitando così l'implementazione di misure preventive efficaci durante lo sviluppo e la manutenzione delle applicazioni.

## OWASP Top 10

L'**[OWASP Top 10](https://owasp.org/www-project-top-ten/)** è una lista dei rischi di sicurezza più comuni e gravi nelle applicazioni web. Ecco alcune delle migliori pratiche di **secure coding** per affrontare i rischi identificati da OWASP. La lista è ordinata dal rischio più comune a quello meno comune.

### A01:2021 **Broken Access Control**

- **Controlli di Autorizzazione**: Applica controlli di autorizzazione sia a livello di API che di interfaccia utente, per garantire che gli utenti abbiano accesso solo alle risorse che dovrebbero.
- **Least Privilege**: Seguire il principio del **minimo privilegio**, concedendo agli utenti solo i permessi strettamente necessari allo svolgimento delle loro attività.

### A02:2021 **Cryptographic Failures**

- **Crittografia**: Cifrare i dati sensibili sia a riposo che in transito utilizzando protocolli come **TLS**.
- **Mascheramento**: Mascherare informazioni sensibili per ridurre il rischio di esposizione accidentale dei dati.

### A03:2021 **Injection**

- **Evitare l'SQL Injection**: Utilizza **Prepared Statements** o gli **ORM** (come JPA) per evitare l'iniezione di codice SQL malevolo.
- **Validazione dei Dati**: Convalida e sanitizza sempre l'input dell'utente per evitare qualsiasi forma di injection, come SQL, HTML o JavaScript.

### A04:2021 **Insecure Design**

- **Progettazione Sicura**: Integrare la sicurezza fin dalle prime fasi di progettazione utilizzando pattern di design sicuri e architetture di riferimento.
- **Principi di Sicurezza**: Applicare principi di progettazione come il principio del minimo privilegio e la [difesa in profondità](https://en.wikipedia.org/wiki/Defense_in_depth_(computing)).

### A05:2021 **Security Misconfiguration**

- **Disabilitare Funzionalità Non Necessarie**: Disabilitare funzionalità che non sono necessarie, come i messaggi di errore dettagliati. Ad esempio, nelle risposte HTTP erronee sarebbe meglio evitare di includere lo stack o rivelare le tecnologie sottostanti ad eventuali attaccanti (come header specifici).
- **Impostare Policy di Sicurezza Forti**: Utilizzare **CORS** (Cross-Origin Resource Sharing) per limitare le origini che possono interagire con la vostra API.

### A06:2021 **Vulnerable and Outdated Components**

- **Gestione delle Dipendenze**: Utilizzare componenti aggiornati e privi di vulnerabilità note. Monitorare e aggiornare regolarmente le librerie e i framework utilizzati.
- **Scanner di Vulnerabilità**: Implementare strumenti di scansione per identificare componenti vulnerabili e pianificare tempestivamente gli aggiornamenti necessari.

### A07:2021 **Identification and Authentication Failures**

- **Implementare un'Autenticazione Robusta**: Utilizzare librerie collaudate per la gestione dell'autenticazione (es. **JWT** per i token di sessione).
- **Scadenza delle Sessioni**: Impostare una scadenza per le sessioni utente per ridurre il rischio di [session hijacking](https://owasp.org/www-community/attacks/Session_hijacking_attack).

### A08:2021 **Software and Data Integrity Failures**

- **Verifica dell'Integrità**: Assicurati che gli aggiornamenti software e i dati critici siano verificati per l'integrità prima dell'implementazione.
- **Protezione delle Pipeline CI/CD**: Implementa controlli di sicurezza nelle pipeline di CI/CD per prevenire compromissioni.

### A09:2021 **Security Logging and Monitoring Failures**

- **Loggare gli Eventi Importanti**: Registra eventi di sicurezza come tentativi di accesso falliti e modifiche alle impostazioni critiche.
- **Protezione dei Log**: Proteggi i log da accessi non autorizzati, assicurandoti che non contengano dati sensibili come password o numeri di carte di credito.

### A10:2021 **Server-Side Request Forgery (SSRF)**

- **Validazione degli Input**: Verifica e sanitizza tutti gli input che possono essere utilizzati per effettuare richieste dal server.
- **Restrizioni di Accesso**: Limita le destinazioni a cui il server può effettuare richieste, utilizzando whitelist e controlli di accesso.

### Voci Aggiuntive dalla Lista Originale

#### **Gestione delle Credenziali**

- **Archiviazione Sicura delle Credenziali**: Oltre a effettuare l'hash delle password, memorizza le credenziali in modo sicuro, ad esempio utilizzando un **vault** o un secret manager.
- **Non Inserire Mai le Credenziali nel Codice Sorgente**.

#### **Gestione degli Errori e delle Eccezioni**

- **Log delle Eccezioni**: Loggare le eccezioni senza fornire dettagli sensibili all'utente finale.

## Algoritmi di hash
Nella implementazione delle pratiche di sicurezza si fa largo uso di algoritmi hash. Un algoritmo di hash è un algoritmo che prende in input una stinga testo di lunghezza arbitraria e restitusice in output una stringa all'apparenza casuale (spesso riferito come opaco) di lunghezza fissa.

 Gli algoritmi di hash vengono utilizzati per vari scopi, come il controllo degli errori, ma nell'ambito della sicurezza informatica si fa leva sulla loro proprietà di non invertibilità per proteggere dati sensibili. Alcuni esempi di applicazione degli algoritmi di hash sono:
 
 - **protezione delle password in un DB**. In questo caso si memorizza solo l'hash della password e non la password in chiaro. Per validare un accesso si confronta l'hash della password inserita dall'utente con quella salvata a DB. In caso di leak del database, facendo leva sulla non reversibilità, non sarà possibile risalire alle password in chiaro
- **firma dei messaggi**. In questo scenario si vuole validare l'autenticità del mittente, senza crittografare l'intero messaggio che verrà quindi distributio in chiaro. Per fare ciò, si produce un hash del messaggio, e poi viene crittografato solo l'hash con chiave privata.

### Esempi di Algoritmi di Hash
- MD5 (Message Digest Algorithm 5): Uno dei primi algoritmi di hash ampiamente utilizzati, ora considerato insicuro a causa delle sue vulnerabilità.
- SHA-1 (Secure Hash Algorithm 1): Migliore di MD5, ma anch'esso considerato obsoleto per applicazioni critiche.
- SHA-256 e SHA-3: Parte della famiglia di algoritmi SHA, attualmente considerati sicuri e ampiamente utilizzati in applicazioni moderne.

## Algoritmi di crittografia
La crittografia è una disciplina della matematica e dell'informatica che si occupa di proteggere le informazioni attraverso l'uso di tecniche di cifratura. L'obiettivo principale della crittografia è garantire la riservatezza, l'integrità e l'autenticità dei dati, rendendoli illeggibili o inutilizzabili a chiunque non possieda le chiavi o le autorizzazioni necessarie per accedervi.

### Principali Obiettivi della Crittografia
- Confidenzialità: Assicurare che solo le persone autorizzate possano leggere il contenuto dei dati.
- Integrità: Garantire che i dati non vengano alterati o manomessi durante la trasmissione o l'archiviazione.
- Autenticazione: Verificare l'identità delle parti coinvolte nella comunicazione.
- Non Ripudio: Impedire che una parte possa negare la propria partecipazione a una comunicazione o transazione.

### Crittografia Simmetrica:

- La crittografia simmetrica utilizza una singola chiave per la cifratura e la decifratura dei dati. La stessa chiave deve essere condivisa tra le parti coinvolte nella comunicazione, garantendo che solo coloro che possiedono la chiave possano accedere al contenuto cifrato.
- Esempi di applicazione: Viene utilizzato per la cifratura vera e propria dei dati, anche di grandi dimensioni, in virtù del fatto che è veloce ed efficiente. Pone però il problema dello scambio sicuro delle chiavi, poiché il destinatario deve essere in possesso della stessa chiave usata per l'encyption, ma essendo internet by design non sicuro non è possibile inviare la chiave di crittografia sullo stesso canale su cui si mandano i dati cifrati. Per questo motivo bisogna usare un algoritmo a chiave asimmetrica. 
- Esempi di algoritmi: AES (Advanced Encryption Standard), DES (Data Encryption Standard).

### Crittografia Asimmetrica:

- La crittografia a chiave asimmetrica, nota anche come crittografia a chiave pubblica, utilizza una coppia di chiavi correlate: una chiave pubblica per la cifratura e una chiave privata per la decifratura. Questo meccanismo elimina la necessità di condividere una chiave segreta, facilitando comunicazioni sicure tra parti che non si sono precedentemente incontrate. Funziona anche su un canale non sicuro come internet. È lento e permette di cifrare solo pochi byte di informazione, per questo motivo viene utilizzato per la cifratura delle chiavi simmetriche e non del dato da condividere in sè.
- Esempi di applicazione: viene utilizzato, come detto, per la cifratura delle chiavi simmetrice al fine di essere scambiate su un canale non sicuro. Se si cifra un hash è possibile firmare il messaggio che ha generato l'hash. Se si cifra l'hash di un certificato o di un token è possibile validare l'emittente.
- Esempi di algoritmi: RSA (Rivest-Shamir-Adleman), ECC (Elliptic Curve Cryptography).

### Certificati e Certificate Chain

I certificati utilizzano la crittografia a chiave pubblica per autenticare l'identità di individui, organizzazioni o dispositivi. Un certificato X.509 contiene, tra le altre cose, informazioni come la chiave pubblica del titolare, l'identità del titolare, la Certificate Authority (CA) che ha emesso il certificato.
In pratica un certificato serve a identicare in modo sicuro un destinatario sulla rete pubblica o aziendale. Nell'ambito della rete internet pubblica (PKI), generalmente un server espone un certificato che ne garantisce l'attendibilità, cioè certificando che la destinazione che si cerca di raggiungere corrisponda a quanto dichiarato (es. corrispondenza tra dominio e indirizzo IP). Il certificato è firmato attraverso un altro certificato, che a sua volta è eventualmente firmato da altri certificati. Percorrendo la catena si dovrebbe arrivare ad un certificato sicuramente attendibile poiché firmato da una CA.

## JWT
### Cos'è un token di sessione
Un token di sesisone è una stringa di dati che viene detenuto dal client e che viene passato ad ogni richiesta al fine di identificare e mantenere la sessione nel tempo.
Spesso i token contengono le informazioni di autenticazione all'interno del token stesso (token trasparente, come JWT), oppure sono stringhe pseudocasuali che rappresentano una sessione a DB (token opachi stateful). In ogni modo, un token per essere definito sicuro non deve essere manipolabile e deve afferire ad uno spazio largo abbastanza da non creare conflitti.

### Cos'è un token JWT
Un token JWT è un tipo speciale di token stateless e trasparente, adatto particolarmente alle architetture a microservizi poiché non mantenendo lo stato, può essere validato da più sistemi in possesso della chiave pubblica.

Un token JWT è composto da 3 parti: l'intestazione, il payload e la firma. Tutte le parti sono in chiaro e semplicemente codificate in base 64, quindi chiunque può leggerne il contenuto, ma la firma garantische che il token non sia stato manipolato e che sia stato emesso da un authentication server in possesso della chiave privata. D'altro canto, la validazione può essere effettuata da chiunque in quanto è sufficiente essere in possesso della chiave pubblica, che non è richiesto che sia mantenuta segreta quindi può essere distribuita anche ad attori non fidati.

### Esempio di JWT
Di seguito un esempio di JWT. Come precedentemente detto, il token è solo codificato in base 64 ed è liberamente consultabile e verificabile in siti come [jwt.io](https://jwt.io/).

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

Ogni sezione è separato dal carattere punto (.). La prima parte è l'intestazione: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9, che si traduce in:
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

sono presenti due property, che sono il tipo (*typ*) che è fisso a JWT, e l'algoritmo (*alg*) con cui è stato firmato il messaggio, che è configurato come HS256. I server possono accettare più algoritmi, un attacco comune consiste nell'usare l'algoritmo meno sicuro tra quelli supportati dal server, quindi è importante assicurarsi di configurare solo un algoritmo sicuro.

La seconda parte è il payload: eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0, che si traduce in:

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1516239022
}
```

Sono presenti le seguenti property (anche dette claims):
- iss: issuer, cioè l'identità di chi ha emesso il token (non presente nell'esempio)
- sub: subject, cioè l'identità dell'utente per cui è stato emesso il token
- iat: issuedAt, cioè la data in cui è stato emesso
- exp: expirationDate, cioè quando scade il token (non presente nell'esempio)

Nell'esempio sono presenti i seguxenti claim custom:
- admin
- name

Poiché il token non è crittografato, non bisogna **MAI** includere informazioni sensibili nei claims, come ad es. le password.

La terza parte è la firma, e a differenza delle altre sezioni non rappresenta un JSON.

### Autenticazione e autorizzazione
Essere in possesso di un token valido, correttamente firmato e non scaduto garantisce di essere in possesso delle credenziali di accesso. Garantisce dunque che chi lo possiede sia chi ha dichiarato di essere. Questa parte viene chiamata autenticazione. Non garantisce, però, quale sia il potenziale d'azione dell'utente in possesso del token, il quale rientra invece nell'ambito dell'autorizzazione.

È dunque importante in ogni scenario non accontentarsi del fatto che un utente sia in possesso di un token valido, ma bisogna anche assicurarsi che il potenziale d'azione dell'utente loggato sia adeguato al ruolo posseduto o che sia adeguato per i vincoli di segretezza del dato a cui si sta cercando di accedere, seguendo il principio di least privilege.

Se ad esempio in un e-commerce un utente sta provando ad eccedere al dettaglio di un ordine, è importante assicurarsi che l'id del proprietario dell'ordine recuperato dalla base dati corrisponda all'id contenuto nel token prima di restituire l'informazione. Seguendo quanto detto prima, un id (così come qualsiasi altro claim) letto dal token può essere utilizzato in modo sicuro, potendoci fidare dell'issuer. Di contro, sviluppando un'applicazione, non bisogna fidarsi di id o altri dati passati attraverso query param, body, o header non cifrati, in quanto questi dati possono essere modificati da client malevoli o da attacchi Man In The Middle (MIDM).


## Collegamenti Esterni

Per ulteriori approfondimenti, puoi consultare i seguenti collegamenti:

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Spring Security Reference](https://docs.spring.io/spring-security/reference/index.html)

## Conclusione

