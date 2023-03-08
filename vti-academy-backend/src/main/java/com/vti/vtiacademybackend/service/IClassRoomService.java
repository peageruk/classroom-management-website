package com.vti.vtiacademybackend.service;

import com.vti.vtiacademybackend.modal.entity.Zoom;
import com.vti.vtiacademybackend.modal.request.create.CreateClassRoomRequest;
import com.vti.vtiacademybackend.modal.request.search.SearchClassRoomRequest;
import com.vti.vtiacademybackend.modal.request.search.SearchZoomRequest;
import com.vti.vtiacademybackend.modal.request.update.UpdateClassRoomRequest;
import com.vti.vtiacademybackend.modal.entity.ClassRoom;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IClassRoomService {
    List<ClassRoom> getAll();

    ClassRoom getById(int id);

    Page<ClassRoom> search(SearchClassRoomRequest request);

    void create(CreateClassRoomRequest request);

    ClassRoom update(int id, UpdateClassRoomRequest request);

    void delete(int id);
}
