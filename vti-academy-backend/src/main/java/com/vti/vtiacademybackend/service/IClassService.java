package com.vti.vtiacademybackend.service;

import com.vti.vtiacademybackend.modal.dto.ClassDto;
import com.vti.vtiacademybackend.modal.request.create.CreateClassRequest;
import com.vti.vtiacademybackend.modal.request.update.UpdateClassRequest;
import com.vti.vtiacademybackend.modal.entity.Class;
import com.vti.vtiacademybackend.modal.request.search.SearchClassRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IClassService {
    List<Class> getAll();

    Page<Class> search(SearchClassRequest request);

    Class getById(int id);

    void create(CreateClassRequest request);

    Class update(int id, UpdateClassRequest request);
//    ClassDto update(int id, UpdateClassRequest request);

    void delete(int id);
}
