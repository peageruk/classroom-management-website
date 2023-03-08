package com.vti.vtiacademybackend.controller;

import com.vti.vtiacademybackend.modal.dto.ClassDto;
import com.vti.vtiacademybackend.modal.request.create.CreateClassRequest;
import com.vti.vtiacademybackend.modal.request.update.UpdateClassRequest;
import com.vti.vtiacademybackend.modal.entity.Class;
import com.vti.vtiacademybackend.modal.request.search.SearchClassRequest;
import com.vti.vtiacademybackend.service.impl.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/v1/classes")
@CrossOrigin("*")
public class ClassController {
    @Autowired
    private ClassService service;

    @GetMapping("/{id}")
    public Class getById(@PathVariable int id) {
        return service.getById(id);
    }

    @GetMapping("/get-all")
    public List<Class> getAll() {
        return service.getAll();
    }

    @PostMapping("/search")
    public Page<Class> search(@RequestBody SearchClassRequest request) {
        return service.search(request);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public void create(@RequestBody @Valid CreateClassRequest request) {
        service.create(request);
    }

    @PostMapping("/update/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public Class update(@RequestBody @Valid UpdateClassRequest request, @PathVariable int id) {
         return service.update(id, request);
    }
//    @PostMapping("/update/{id}")
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
//    public ClassDto update(@RequestBody @Valid UpdateClassRequest request, @PathVariable int id) {
//         return service.update(id, request);
//    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public void delete(@PathVariable int id) {
        service.delete(id);
    }

}
