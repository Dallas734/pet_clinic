import { memo, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Modal } from "@/shared/ui/Modal";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import cls from "./FilterModal.module.scss";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { addProp } from "@/widgets/Page/model/slices/propSlice";
import classNames from "classnames";

export enum NavBarListName {
  Petclinic = "Petclinic",
  MasterData = "Master data",
  Administration = "Administration",
}

const FilterModal = memo(() => {
  const dispatch = useAppDispatch();
  const [selected, selectProp] = useState("");
  const [isOpen, changeOpen] = useState(false);

  const Properties = [
    "Created at",
    "Created date",
    "Deleted at",
    "Deleted date",
    "First name",
    "Id",
    "Last modified by",
    "Last modified date",
    "Last name",
    "Version",
  ];

  const selectButton = classNames(
    "icon",
    "crud",
    "border-radius",
    "createButton"
  ).split(" ");

  const canselButton = classNames(
    "icon",
    "crud",
    "border-radius",
    "closeModal"
  ).split(" ");

  const openProp = () => {
    isOpen === true ? changeOpen(false) : changeOpen(true);
  };

  const acceptProp = () => {
    dispatch(addProp({ name: selected }));
    closeModal();
  };

  const PropertiesList = (
    <div className={cls.propsWithButton}>
      <Button type={"submit"} classes={classNames([cls.activeProp],[cls.dropListButton], {'navDropListOpen': !isOpen}, {'navDrop': isOpen}).split(" ")} onClick={openProp}>
        Properties
      </Button>
      {isOpen && (
        <ul className={cls.props}>
          {Properties.map((item: string) => {
            return (
              <li
                className={classNames({ [cls.activeProp]: item === selected })}
              >
                <Button onClick={() => selectProp(item)}>{item}</Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );

  const [modalIsOpen, setIsOpen] = useState(false);


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const options = ["Create Property condition", "Create JPQL condition", "CReate Group condition"];
  const defaultOption = "Create";

  const ModalContent = (
    <div>
      <Input placeholder="Search..."></Input>
      <br />
      <Dropdown
        options={options}
        value={defaultOption}
        placeholder="Select an option"
      />
      <br />
      <nav className={cls.nav}>
        <div className={cls.navList}>
        </div>
      </nav>
      {PropertiesList}
      <Button classes={selectButton} onClick={acceptProp}>
        Select
      </Button>
      <Button classes={canselButton} onClick={closeModal}>
        Cancel
      </Button>
    </div>
  );

  return (
    <div>
      <Button type={"submit"} onClick={openModal}>
        Add search condition
      </Button>
      <Modal isOpen={modalIsOpen} title={"Add Condition"} onClose={closeModal}>
        {ModalContent}
      </Modal>
    </div>
  );
});

export default FilterModal;
