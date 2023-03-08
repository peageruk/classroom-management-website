package com.vti.vtiacademybackend.service;

import com.vti.vtiacademybackend.modal.request.create.CreateZoomRequest;
import com.vti.vtiacademybackend.modal.request.update.UpdateZoomRequest;
import com.vti.vtiacademybackend.modal.entity.Zoom;
import com.vti.vtiacademybackend.modal.request.search.SearchZoomRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IZoomService {
    List<Zoom> getAll();

    Zoom getById(int id);

    Page<Zoom> search(SearchZoomRequest request);

    void create(CreateZoomRequest request);

    Zoom update(int id, UpdateZoomRequest request);

    void delete(int id);

}
