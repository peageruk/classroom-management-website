package com.vti.vtiacademybackend.modal.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "`zoom`")
public class Zoom {
    @Id
    @Column(name = "`id`")
    private int id;
    @Column(name = "`name`", length = 50, unique = true, nullable = false)
    private String name;
    @Column(name = "`link`", length = 100, unique = true, nullable = false)
    private String link;
    @Column(name = "`description`", length = 500)
    private String description;
    @Column(name = "`note`", length = 500)
    private String note;
    @Column(name = "`meeting_id`", length = 15, unique = true, nullable = false)
    private String meetingId;
    @Column(name = "`pass_code`", length = 15, nullable = false)
    private String passCode;
//    @OneToMany(mappedBy = "zoomId")
//    private List<Class> classes;

}
