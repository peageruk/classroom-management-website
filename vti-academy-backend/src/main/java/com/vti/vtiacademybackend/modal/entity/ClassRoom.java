package com.vti.vtiacademybackend.modal.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "`class_room`")
public class ClassRoom {
    @Id
    @Column(name = "`id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "`name`", length = 50, unique = true, nullable = false)
    private String name;
    @Column(name = "`address`", length = 100, nullable = false)
    private String address;
    @Column(name = "`note`", length = 500)
    private String note;
    @Column(name = "`size`")
    private int size;
//    @OneToMany(mappedBy = "classRoomId")
//    private List<Class> classes;
}
