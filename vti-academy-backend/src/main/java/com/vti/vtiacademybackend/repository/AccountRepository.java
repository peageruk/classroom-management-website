package com.vti.vtiacademybackend.repository;

import com.vti.vtiacademybackend.modal.entity.Account;
import com.vti.vtiacademybackend.modal.entity.Zoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer>, JpaSpecificationExecutor<Account> {
    Optional<Account> findByUsername(String username);

    Page<Account> findByUsernameContains(String username, Pageable pageable);


}
