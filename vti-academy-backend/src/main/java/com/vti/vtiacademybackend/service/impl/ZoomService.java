package com.vti.vtiacademybackend.service.impl;

import com.vti.vtiacademybackend.exception.AppException;
import com.vti.vtiacademybackend.exception.ErrorResponseBase;
import com.vti.vtiacademybackend.modal.request.BaseRequest;
import com.vti.vtiacademybackend.modal.request.create.CreateZoomRequest;
import com.vti.vtiacademybackend.modal.request.update.UpdateZoomRequest;
import com.vti.vtiacademybackend.modal.entity.Zoom;
import com.vti.vtiacademybackend.modal.request.search.SearchZoomRequest;
import com.vti.vtiacademybackend.repository.ZoomRepository;
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
public class ZoomService implements IZoomService {

    @Autowired
    private ZoomRepository repository;

    @Override
    public List<Zoom> getAll() {
        return repository.findAll();
    }

    @Override
    public Zoom getById(int id) {
        Optional<Zoom> zoom = repository.findById(id);
        if (zoom.isEmpty()) {
            throw new AppException(ErrorResponseBase.NOT_FOUND);
        }
        return zoom.get();
    }

    @Override
    public Page<Zoom> search(SearchZoomRequest request) {
        PageRequest pageRequest = BaseRequest.buildPageRequest(request);
        return repository.findByNameContains(request.getName(), pageRequest);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void create(CreateZoomRequest request) {
        Zoom zoom = new Zoom();
        BeanUtils.copyProperties(request, zoom);
        repository.save(zoom);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Zoom update(int id, UpdateZoomRequest request) {
        Zoom zoom = getById(id);
        BeanUtils.copyProperties(request, zoom);
        return repository.save(zoom);
    }

    @Override
    public void delete(int id) {
        Zoom zoom = getById(id);
        repository.delete(zoom);
    }

}
