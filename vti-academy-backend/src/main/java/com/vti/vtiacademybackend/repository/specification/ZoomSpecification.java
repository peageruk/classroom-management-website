package com.vti.vtiacademybackend.repository.specification;

import com.vti.vtiacademybackend.modal.entity.Class;
import com.vti.vtiacademybackend.modal.entity.Zoom;
import com.vti.vtiacademybackend.modal.request.search.SearchZoomRequest;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;

public class ZoomSpecification {

//    public static Specification<Zoom> buildCondition(SearchZoomRequest request){
//        return Specification.where(byZoomName(request.getName()));
//    }
//    private static Specification<Zoom> byZoomName(String zoomName) {
//        if(zoomName!=null) {
//            return (root, query, cri) -> {
//                return cri.like(root.get("name"), "%" + zoomName + "%");
//            };
//        }
//        return null;
//    }
//    private static Specification<Class> byZoomId(Zoom zoomId){
//        if(zoomId!=null){
//            return (root, query, cri) -> {
//                Join<Class, Zoom> joiner = root.join("zoomId");
//                return cri.equal(joiner.get("id"), zoomId);
//            };
//        }
//        return null;
//    }
}
