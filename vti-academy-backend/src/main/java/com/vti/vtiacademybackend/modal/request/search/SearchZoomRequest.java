package com.vti.vtiacademybackend.modal.request.search;

import com.vti.vtiacademybackend.modal.request.BaseRequest;
import lombok.Data;

@Data
public class SearchZoomRequest extends BaseRequest {
    private String name;
}
