package com.vti.vtiacademybackend.modal.request.search;

import com.vti.vtiacademybackend.modal.entity.Account;
import com.vti.vtiacademybackend.modal.entity.ClassRoom;
import com.vti.vtiacademybackend.modal.entity.ClassStatus;
import com.vti.vtiacademybackend.modal.entity.Zoom;
import com.vti.vtiacademybackend.modal.request.BaseRequest;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class SearchClassRequest extends BaseRequest {
    private String name;
//    private ClassStatus classStatus;
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
//    private Date startDate;
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
//    private Date endDate;
//    private int zoomId;
//    private int classRoomId;

}
