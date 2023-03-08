package com.vti.vtiacademybackend.repository;

import com.vti.vtiacademybackend.modal.entity.ClassRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRoomRepository extends JpaRepository<ClassRoom, Integer>, JpaSpecificationExecutor<ClassRoom> {
    Page<ClassRoom> findByNameContains(String name, Pageable pageable);
}
