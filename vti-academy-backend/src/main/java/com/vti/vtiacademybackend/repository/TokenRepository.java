package com.vti.vtiacademybackend.repository;

import com.vti.vtiacademybackend.modal.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {

    Token findByToken(String token);

    List<Token> findAllByExpirationIsAfter(Date exDate);

}
