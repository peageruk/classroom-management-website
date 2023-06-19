import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { putUpdateUser } from "../services/UserService";
// import { toast } from "react-toastify";

const ModalEditUser = (props) => {
  const { dataUserEdit, show, handleClose } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  //   const handleClose = () => {
  //     // setName("");
  //     // setJob("");
  //     props.handleClose();
  //   };
  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
    }
  }, [show, dataUserEdit]);

  const handleEditUser = () => {
    // let res = await putUpdateUser(dataUserEdit.id);
    // console.log(">>>check response: ", res);
    // if (res && res.updatedAt) {
    //   toast.success("success!");
    //   handleClose();
    // } else {
    //   toast.error("error!");
    // }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              placeholder="input name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Job</label>
            <input
              type="text"
              className="form-control"
              value={job}
              onChange={(event) => {
                setJob(event.target.value);
              }}
              placeholder="input job"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
