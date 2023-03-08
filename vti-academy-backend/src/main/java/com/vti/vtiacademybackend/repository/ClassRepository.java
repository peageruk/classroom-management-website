package com.vti.vtiacademybackend.repository;

import com.vti.vtiacademybackend.modal.entity.Class;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRepository extends JpaRepository<Class, Integer>, JpaSpecificationExecutor<Class> {
    Page<Class> findByNameContains(String name, Pageable pageable);
}
