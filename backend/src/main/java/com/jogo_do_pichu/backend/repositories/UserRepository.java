package com.jogo_do_pichu.backend.repositories;

import com.jogo_do_pichu.backend.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,String> {

    Optional<User> findByEmail(String email);
}
