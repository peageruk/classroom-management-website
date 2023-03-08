package com.vti.vtiacademybackend.repository.specification;

import com.vti.vtiacademybackend.modal.entity.Class;
import com.vti.vtiacademybackend.modal.entity.ClassRoom;
import com.vti.vtiacademybackend.modal.entity.ClassStatus;
import com.vti.vtiacademybackend.modal.entity.Zoom;
import com.vti.vtiacademybackend.modal.request.search.SearchClassRequest;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import java.util.Date;

public class ClassSpecification {
//    public static Specification<Class> buildCondition(SearchClassRequest request){
//        return Specification.where(byClassName(request.getClassName()))
//                .and(byClassStatus(request.getClassStatus()))
//                .and(byStartDate(request.getStartDate()))
//                .and(byEndDate(request.getEndDate()))
//                .and(byZoomId(request.getZoomId()))
//                .and((byClassRoomId(request.getClassRoomId())));
//    }
//    private static Specification<Class> byClassName(String className) {
//        if (className != null) {
//            return (root, query, cri) -> {
//                return cri.like(root.get("name"), "%" + className + "%");
//            };
//        }
//        return null;
//    }
//
//    private static Specification<Class> byClassStatus(ClassStatus classStatus) {
//        if (classStatus != null) {
//            return (root, query, cri) -> {
//                return cri.equal(root.get("status"), classStatus);
//            };
//        }
//        return null;
//    }
//
//    private static Specification<Class> byStartDate(Date startDate) {
//        if (startDate != null) {
//            return (root, query, cri) -> {
//                return cri.lessThanOrEqualTo(root.get("startDate"),startDate);
//            };
//        }
//        return null;
//    }
//
//    private static Specification<Class> byEndDate(Date endDate) {
//        if (endDate != null) {
//            return (root, query, cri) -> {
//                return cri.greaterThanOrEqualTo(root.get("endDate"), endDate);
//            };
//        }
//        return null;
//    }
//
//    private static Specification<Class> byZoomId(int zoomId){
//        if(zoomId>0){
//            return (root, query, cri) -> {
//                Join<Class, Zoom> joiner = root.join("zoomId");
//                return cri.equal(joiner.get("id"), zoomId);
//            };
//        }
//        return null;
//    }
//
//    private static Specification<Class> byClassRoomId(int ClassRoomId){
//        if(ClassRoomId>0){
//            return (root, query, cri) -> {
//                Join<Class, ClassRoom> joiner = root.join("ClassRoomId");
//                return cri.equal(joiner.get("id"), ClassRoomId);
//            };
//        }
//        return null;
//    }


}
