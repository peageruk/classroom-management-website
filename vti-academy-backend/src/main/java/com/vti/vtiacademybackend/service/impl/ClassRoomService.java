package com.vti.vtiacademybackend.service.impl;

import com.vti.vtiacademybackend.exception.AppException;
import com.vti.vtiacademybackend.exception.ErrorResponseBase;
import com.vti.vtiacademybackend.modal.request.BaseRequest;
import com.vti.vtiacademybackend.modal.request.create.CreateClassRoomRequest;
import com.vti.vtiacademybackend.modal.request.search.SearchClassRoomRequest;
import com.vti.vtiacademybackend.modal.request.update.UpdateClassRoomRequest;
import com.vti.vtiacademybackend.modal.entity.ClassRoom;
import com.vti.vtiacademybackend.repository.ClassRoomRepository;
import com.vti.vtiacademybackend.service.IClassRoomService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ClassRoomService implements IClassRoomService {

    @Autowired
    private ClassRoomRepository repository;

    @Override
    public List<ClassRoom> getAll() {
        return repository.findAll();
    }

    @Override
    public ClassRoom getById(int id) {
        Optional<ClassRoom> classRoom = repository.findById(id);
        if (classRoom.isEmpty()) {
            throw new AppException(ErrorResponseBase.CLASS_ROOM_NOT_FOUND);
        }
        return classRoom.get();
    }

    @Override
    public Page<ClassRoom> search(SearchClassRoomRequest request) {
        PageRequest pageRequest = BaseRequest.buildPageRequest(request);
        return repository.findByNameContains(request.getName(), pageRequest);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void create(CreateClassRoomRequest request) {
        ClassRoom classRoom = new ClassRoom();
        BeanUtils.copyProperties(request, classRoom);
        repository.save(classRoom);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ClassRoom update(int id, UpdateClassRoomRequest request) {
        ClassRoom classRoom = getById(id);
        BeanUtils.copyProperties(request, classRoom);
        return repository.save(classRoom);

    }

    @Override
    public void delete(int id) {
        repository.deleteById(id);
    }
}
