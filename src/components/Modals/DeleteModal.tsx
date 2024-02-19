import React, { useState } from "react";

import { Modal, Button } from "antd";

import { HiOutlineTrash } from "react-icons/hi";
import { PiWarningCircleLight } from "react-icons/pi";

interface Props {
  id: string;
  type: string;
  getData: () => void;
}

const DeleteModal: React.FC<Props> = ({ id, type, getData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const showModal = () => setIsModalOpen(true);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    // const res =
    //   type === "user"
    //     ? await deleteUser(id)
    //     : type === "product"
    //     ? await deleteProduct(id)
    //     : "";
    // if (res) {
    //   handleCancel();
    //   getData();
    // }
    setIsLoading(false);
  };

  return (
    <>
      <HiOutlineTrash className="icon" onClick={showModal} />
      <Modal
        forceRender
        title={" "}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        className="delete_modal"
        centered
      >
        <div className="delete_modal_wrapper">
          <PiWarningCircleLight size={60} color={"orange"} />
          <h2>Are You Sure?</h2>
          <div className="delete_modal_footer">
            <Button className="buttonOutlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              className="button"
              type="primary"
              loading={isLoading}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default DeleteModal;
