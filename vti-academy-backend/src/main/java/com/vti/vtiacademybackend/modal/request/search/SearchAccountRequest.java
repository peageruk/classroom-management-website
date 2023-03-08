package com.vti.vtiacademybackend.modal.request.search;

import com.vti.vtiacademybackend.modal.request.BaseRequest;
import lombok.Data;

@Data
public class SearchAccountRequest extends BaseRequest {
    private String name;
}
