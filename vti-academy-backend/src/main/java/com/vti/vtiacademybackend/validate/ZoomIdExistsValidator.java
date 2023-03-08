package com.vti.vtiacademybackend.validate;

import com.vti.vtiacademybackend.repository.ZoomRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ZoomIdExistsValidator implements ConstraintValidator<ZoomIdExists, Integer> {

    @Autowired
    ZoomRepository repository;
//    @Override
//    public void initialize(ZoomIdExists constraintAnnotation) {
//        ConstraintValidator.super.initialize(constraintAnnotation);
//    }

    @Override
    public boolean isValid(Integer integer, ConstraintValidatorContext constraintValidatorContext) {
        return repository.existsById(integer);
    }
}
