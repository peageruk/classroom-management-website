import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { searchUsers } from "../services/UserService.js";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
const Accounts = () => {
  const [totalPage, setTotalPage] = useState(0);
  // const [totalUser, setTotalUser] = useState(0);
  const [page, setPage] = useState(0);
  const token = localStorage.getItem("token");
  const [listUsers, setListUsers] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);
  useEffect(() => {
    searchUser();
  }, [page]);
  const searchUser = async () => {
    let response = await searchUsers(token, page);
    if (response && response.content) {
      setListUsers(response.content);
      setTotalPage(response.totalPages);
      // setTotalUser(response.totalElements);
    }
    console.log(response);
  };
  const handlePageClick = (event) => {
    setPage(event.selected);
  };
  const handleEditUser = (user) => {
    setDataUserEdit(user);
    console.log(user);
    handleShowEdit();
  };
  console.log("listUsers", listUsers);
  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <span className="align-bottom fw-bold">List User:</span>
        <button className="btn btn-primary" onClick={handleShowCreate}>
          Add user
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>username</th>
            <th>fullName</th>
            <th>role</th>
            <th>email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.fullName}</td>
                  <td>{item.role}</td>
                  <td>{item.email}</td>
                  <td className="d-flex justify-content-between">
                    <button
                      className="btn btn-warning "
                      onClick={() => {
                        handleEditUser(item.id);
                      }}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger ">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        pageCount={totalPage}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <ModalAddNew show={showCreate} handleClose={handleCloseCreate} />
      <ModalEditUser
        show={showEdit}
        handleClose={handleCloseEdit}
        dataUserEdit={dataUserEdit}
      />
    </>
  );
};

export default Accounts;
