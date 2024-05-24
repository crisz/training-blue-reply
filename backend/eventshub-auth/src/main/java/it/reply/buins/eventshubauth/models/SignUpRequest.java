package it.reply.buins.eventshubauth.models;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpRequest {
    private String username;
    private String password;
    private String email;
}
