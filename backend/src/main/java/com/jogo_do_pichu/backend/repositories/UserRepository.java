package com.jogo_do_pichu.backend.repositories;

import com.jogo_do_pichu.backend.domain.User;
import com.jogo_do_pichu.backend.dto.MeDTO;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,String> {

    Optional<User> findByEmail(String email);

    //PreparedStatement por debaixo dos panos, tanto em queries JPQL quanto em Native Queries. Evitando erro de SQL Inject
    @Query(value = "SELECT * FROM user WHERE email = :email FOR UPDATE", nativeQuery = true)
    Optional<User> findByEmailWithLock(@Param("email") String email);

}