package com.vti.vtiacademybackend.controller;

import com.vti.vtiacademybackend.modal.entity.Class;
import com.vti.vtiacademybackend.modal.request.create.CreateZoomRequest;
import com.vti.vtiacademybackend.modal.request.update.UpdateZoomRequest;
import com.vti.vtiacademybackend.modal.entity.Zoom;
import com.vti.vtiacademybackend.modal.request.search.SearchZoomRequest;
import com.vti.vtiacademybackend.service.impl.ZoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/v1/zooms")
@CrossOrigin("*")
public class ZoomController {
    @Autowired
    private ZoomService service;

    @GetMapping("/{id}")
    public Zoom getById(@PathVariable int id) {
        return service.getById(id);
    }

    @GetMapping("/get-all")
    public List<Zoom> getAll() {
        return service.getAll();
    }

    @PostMapping("/search")
    Page<Zoom> search(@RequestBody SearchZoomRequest request) {
        return service.search(request);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public void create(@RequestBody @Valid CreateZoomRequest request) {
        service.create(request);
    }

    @PostMapping("/update/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public Zoom update(@RequestBody @Valid UpdateZoomRequest request, @PathVariable int id) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public void delete(@PathVariable int id) {
        service.delete(id);
    }


}
