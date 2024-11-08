package it.reply.buins.eventshubauth.repositories;

import it.reply.buins.eventshubauth.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    public UserEntity findByUsername(String username);
    public UserEntity findByEmail(String email);

}
