package com.vti.vtiacademybackend.modal.entity;

import lombok.Data;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "`class`")
public class Class {

    @Id
    @Column(name = "`id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "`class_name`", length = 50, unique = true, nullable = false)
    private String name;
    @Column(name = "`start_date`", nullable = false)
    private Date startDate;
    @Column(name = "`end_date`", nullable = false)
    private Date endDate;
    @Enumerated(EnumType.STRING)
    @Column(name = "`class_status`", nullable = false)
    private ClassStatus status;
    @Enumerated(EnumType.STRING)
    @Column(name = "`teaching_form`", nullable = false)
    private TeachingForm form;
    @ManyToOne
//    @ManyToOne(cascade = CascadeType.ALL)
//    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JoinColumn(name = "`mentor_id`", referencedColumnName = "`id`", foreignKey = @ForeignKey(name = "`class_fk0`"), nullable = true)
    private Account mentorId;
    @ManyToOne
//    @ManyToOne(cascade = CascadeType.ALL)
//    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JoinColumn(name = "`zoom_id`", referencedColumnName = "`id`", foreignKey = @ForeignKey(name = "`class_fk1`"), nullable = true)
//    @JoinColumn(name = "`zoom_id`")
    private Zoom zoomId;
    @ManyToOne
//    @ManyToOne(cascade = CascadeType.ALL)
//    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JoinColumn(name = "`class_zoom_id`",nullable = true)
    private ClassRoom classRoomId;
    @Column(name = "`description`", length = 255)
    private String description;
    @Column(name = "`schedule`", length = 255, nullable = false)
    private String schedule;
//
//    @OneToMany(mappedBy = "classId")
//    private List<Account> accounts;

}
