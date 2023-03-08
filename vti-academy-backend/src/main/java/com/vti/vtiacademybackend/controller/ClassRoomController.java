package com.vti.vtiacademybackend.controller;

import com.vti.vtiacademybackend.modal.entity.Class;
import com.vti.vtiacademybackend.modal.request.create.CreateClassRoomRequest;
import com.vti.vtiacademybackend.modal.request.search.SearchClassRoomRequest;
import com.vti.vtiacademybackend.modal.request.update.UpdateClassRoomRequest;
import com.vti.vtiacademybackend.modal.entity.ClassRoom;
import com.vti.vtiacademybackend.service.impl.ClassRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/v1/class-rooms")
@CrossOrigin("*")
public class ClassRoomController {
    @Autowired
    private ClassRoomService service;
    @GetMapping("/{id}")
    public ClassRoom getById(@PathVariable int id) {
        return service.getById(id);
    }
    @GetMapping("/get-all")
    public List<ClassRoom> getAll() {
        return service.getAll();
    }

    @PostMapping("/search")
    Page<ClassRoom> search(@RequestBody SearchClassRoomRequest request) {
        return service.search(request);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public void create(@RequestBody @Valid CreateClassRoomRequest request) {
        service.create(request);
    }

    @PostMapping("/update/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ClassRoom update(@RequestBody @Valid UpdateClassRoomRequest request, @PathVariable int id) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public void delete(@PathVariable int id) {
        service.delete(id);
    }
}
