---
layout: page  
title: Ex3 ~ Validazione Input e Sicurezza  
permalink: /esercizi/backend/esercizio3  
parent: Esercizi Backend  
nav_order: 3  
---


# Esercizio 3  

## Validazione Input e Sicurezza  
In questo esercizio verrà implementata la **validazione dei campi di input** per il servizio di registrazione utente. In particolare, sarà necessario aggiungere controlli formali sui dati inseriti e una **validazione robusta della password** per garantire maggiore sicurezza.  

## Temi trattati  
Validazione Input  
{: .label }  

Sicurezza  
{: .label }  

Password Robustezza  
{: .label }  

## Procedimento  
1. **Modifica del servizio di registrazione**  
   - Endpoint esistente: `POST /register`  
   - Aggiungere validazione formale per i campi (e.g., email valida, lunghezza username).  

2. **Implementazione dei controlli sulla password**  
   - La password deve rispettare i seguenti requisiti:  
     - Lunghezza minima: 8 caratteri  
     - Almeno una lettera maiuscola  
     - Almeno un carattere speciale  

3. **Gestione degli errori**  
   - Restituire risposte di errore appropriate se la validazione fallisce.  

## Domande  
- Come si utilizza la **Bean Validation** in Spring per validare i campi?  
- Come implementeresti una logica per la validazione di password robuste?  
- Come si gestiscono gli errori di validazione in un Controller?  

## Risoluzione  
<details>  
  <summary>Visualizza soluzione</summary>  
  <ol>  
    <li>  
      **Aggiunta delle annotazioni di validazione**  
      - Modificare il DTO `UserRegistrationRequest` per includere controlli di input:  
      ```java  
      public class UserRegistrationRequest {  
          @NotBlank(message = "Username obbligatorio")  
          private String username;  

          @Email(message = "Email non valida")  
          private String email;  

          @NotBlank(message = "Password obbligatoria")  
          private String password;  
          
          // Getters e Setters  
      }  
      ```  
    </li>  

    <li>  
      **Implementazione della validazione password**  
      - Creare una classe di utilità per validare la robustezza della password:  
      ```java  
      public class PasswordValidator {  
          private static final String PASSWORD_PATTERN =  
              "^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?\":{}|<>]).{8,}$";  

          public static boolean isValid(String password) {  
              return password != null && password.matches(PASSWORD_PATTERN);  
          }  
      }  
      ```  
    </li>  

    <li>  
      **Modifica del Controller per validare l’input**  
      - Aggiungere i controlli nella logica di registrazione:  
      ```java  
      @RestController  
      @RequestMapping("/register")  
      public class RegistrationController {  

          @PostMapping  
          public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationRequest request) {  
              if (!PasswordValidator.isValid(request.getPassword())) {  
                  return ResponseEntity.badRequest().body("La password non rispetta i requisiti di sicurezza.");  
              }  
              // Logica di registrazione  
              return ResponseEntity.ok("Registrazione completata con successo.");  
          }  
      }  
      ```  
    </li>  

    <li>  
      **Gestione globale degli errori**  
      - Implementare un handler per catturare errori di validazione:  
      ```java  
      @ControllerAdvice  
      public class ValidationExceptionHandler {  

          @ExceptionHandler(MethodArgumentNotValidException.class)  
          public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {  
              Map<String, String> errors = new HashMap<>();  
              ex.getBindingResult().getFieldErrors().forEach(error -> {  
                  errors.put(error.getField(), error.getDefaultMessage());  
              });  
              return ResponseEntity.badRequest().body(errors);  
          }  
      }  
      ```  
    </li>  
  </ol>  
</details>  
