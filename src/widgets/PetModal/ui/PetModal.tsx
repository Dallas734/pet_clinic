import { memo, useEffect, useState } from "react";
import cls from "./PetModal.module.scss";
import { Input } from "@/shared/ui/Input";
import { Modal } from "@/shared/ui/Modal";
import { Button } from "@/shared/ui/Button";
import classNames from "classnames";
import { Select } from "@/shared/ui/Select";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const PetModal = memo((props: ModalProps) => {
  const { isOpen, setIsOpen } = props;

  const classes = classNames("petModal").split(" ");
  function closeModal() {
    setIsOpen(false);
  }

  const closeButtonClasses = classNames(
    "icon",
    "crud",
    "border-radius",
    "closeModalBtn"
  ).split(" ");

  const ModalContent = (
    <div className={cls.modal}>
      <div className={cls.petName}>
        <label>Кличка</label>
        <Input />
      </div>
      <div className={cls.block}>
        <div className={cls.field}>
          <label>Тип питомца</label>
          <Select />
        </div>
        <div className={cls.field}>
          <label>Владелец</label>
          <Select />
        </div>
        <div className={cls.field}>
          <label>ID</label>
          <Input />
        </div>
        <div className={cls.field}>
          <label>Дата рождения</label>
          <Input />
        </div>
      </div>
      <Button
        children={"Закрыть"}
        onClick={closeModal}
        classes={closeButtonClasses}
      />
    </div>
  );
  return (
    <Modal
      isOpen={isOpen}
      title="Модальное окно"
      onClose={closeModal}
      classes={classes}
    >
      {ModalContent}
    </Modal>
  );
});

export default PetModal;
