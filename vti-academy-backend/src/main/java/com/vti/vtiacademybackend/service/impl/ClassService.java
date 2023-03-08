package com.vti.vtiacademybackend.service.impl;

import com.vti.vtiacademybackend.exception.AppException;
import com.vti.vtiacademybackend.exception.ErrorResponseBase;
import com.vti.vtiacademybackend.modal.dto.ClassDto;
import com.vti.vtiacademybackend.modal.request.create.CreateClassRequest;
import com.vti.vtiacademybackend.modal.request.update.UpdateClassRequest;
import com.vti.vtiacademybackend.modal.entity.Account;
import com.vti.vtiacademybackend.modal.entity.Class;
import com.vti.vtiacademybackend.modal.entity.ClassRoom;
import com.vti.vtiacademybackend.modal.entity.Zoom;
import com.vti.vtiacademybackend.modal.request.BaseRequest;
import com.vti.vtiacademybackend.modal.request.search.SearchClassRequest;
import com.vti.vtiacademybackend.repository.ClassRepository;
import com.vti.vtiacademybackend.service.IAccountService;
import com.vti.vtiacademybackend.service.IClassRoomService;
import com.vti.vtiacademybackend.service.IClassService;
import com.vti.vtiacademybackend.service.IZoomService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ClassService implements IClassService {

    @Autowired
    private ClassRepository repository;
    @Autowired
    private IAccountService accountService;
    @Autowired
    private IClassRoomService classRoomService;
    @Autowired
    private IZoomService zoomService;

    @Override
    public List<Class> getAll() {
        return repository.findAll();
    }

    @Override
    public Page<Class> search(SearchClassRequest request) {
        PageRequest pageRequest = BaseRequest.buildPageRequest(request);
//        Specification<Class> condition = ClassSpecification.buildCondition(request);  //cách 2 dùng build condition
//        return repository.findAll(condition, pageRequest);                            //cách 2
        return repository.findByNameContains(request.getName(), pageRequest);      //cách 1
    }

    @Override
    public Class getById(int id) {
        Optional<Class> clazz = repository.findById(id);
        if (clazz.isEmpty()) {
            throw new AppException(ErrorResponseBase.CLASS_NOT_FOUND);
        }
        return clazz.get();
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void create(CreateClassRequest request) {
        Class clazz = new Class();
        Account account = accountService.getById(request.getMentorId());
        ClassRoom classRoom = classRoomService.getById(request.getClassRoomId());
        Zoom zoom = zoomService.getById(request.getZoomId());
        BeanUtils.copyProperties(request, clazz);
        if (zoom != null && account != null && classRoom != null) {
            clazz.setZoomId(zoom);
            clazz.setMentorId(account);
            clazz.setClassRoomId(classRoom);
        }
        repository.save(clazz);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Class update(int id, UpdateClassRequest request) {
        Class clazz = getById(id);
        ClassDto classDto = new ClassDto();
        BeanUtils.copyProperties(request, clazz);
        Account account = accountService.getById(request.getMentorId());
        ClassRoom classRoom = classRoomService.getById(request.getClassRoomId());
        Zoom zoom = zoomService.getById(request.getZoomId());
        if (zoom != null && account != null && classRoom != null) {
            clazz.setClassRoomId(classRoom);
            clazz.setMentorId(account);
            clazz.setZoomId(zoom);
        }
        return repository.save(clazz);
    }
//    @Override
//    @Transactional(rollbackOn = Exception.class)
//    public ClassDto update(int id, UpdateClassRequest request) {
//        Class clazz = getById(id);
//        ClassDto classDto = new ClassDto();
//        BeanUtils.copyProperties(request, clazz);
//        Account account = accountService.getById(request.getMentorId());
//        ClassRoom classRoom = classRoomService.getById(request.getClassRoomId());
//        Zoom zoom = zoomService.getById(request.getZoomId());
//        if (zoom != null && account != null && classRoom != null) {
//            clazz.setClassRoomId(classRoom);
//            clazz.setMentorId(account);
//            clazz.setZoomId(zoom);
//        }
//        BeanUtils.copyProperties(clazz, classDto);
//        classDto.setClassRoomId(classRoom.getId());
//        classDto.setZoomId(zoom.getId());
//        classDto.setMentorId(account.getId());
//        repository.save(clazz);
//        return classDto;
//    }

    @Override
    public void delete(int id) {
        repository.deleteById(id);
    }
}
