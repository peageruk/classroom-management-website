package com.vti.vtiacademybackend.modal.entity;

import lombok.Data;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "`account`")
public class Account {
    @Id
    @Column(name = "`id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "`username`", length = 50, unique = true, nullable = false)
    private String username;
    @Column(name = "`date_of_birth`", nullable = false)
    private Date dateOfBirth;
    @Column(name = "`address`", length = 255, nullable = false)
    private String address;
    @Column(name = "`password`", length = 500, nullable = false)
    private String password;
    @Column(name = "`full_name`", length = 50)
    private String fullName;
    @Enumerated(EnumType.STRING)
    @Column(name = "`role`", nullable = false)
    private Role role;
    @Column(name = "`phone_number`", length = 12, unique = true, nullable = false)
    private String phoneNumber;
    @Column(name = "`email`", length = 50, unique = true, nullable = false)
    private String email;
    @Column(name = "`facebook`", length = 50, unique = true, nullable = false)
    private String facebook;
    @Column(name = "`information`", length = 255)
    private String information;
    @ManyToOne
//    @ManyToOne(cascade = CascadeType.ALL)
//    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JoinColumn(name = "`class_id`", referencedColumnName = "`id`", foreignKey = @ForeignKey(name = "`account_fk0`"))
    private Class classId;
//    @OneToMany(mappedBy = "mentorId")
//    private List<Class> classes;

}
