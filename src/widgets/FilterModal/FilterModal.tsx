import { memo, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Modal } from "@/shared/ui/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link, useNavigate } from "react-router-dom";
import cls from "./FilterModal.module.scss";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector/useAppSelector";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { addProp, removeProp } from "@/widgets/Page/model/slices/propSlice";
import { RootState } from "@/app/providers/StoreProvider/config/store";
import classNames from "classnames";
import cnBind from "classnames/bind";

const HistoryNav = memo(() => {
  const cn = cnBind.bind(cls);
  const currentUrl = useAppSelector((state: RootState) => state.nav.currentUrl);
  const dispatch = useAppDispatch();
  const [selected, selectProp] = useState('');
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

  const selectButton=classNames(
    "icon",
    "crud",
    "border-radius",
    "createButton"
  ).split(" ");

  const canselButton=classNames(
    "icon",
    "crud",
    "border-radius",
    "closeButton"
  ).split(" ");
  // const selectedProps = [];

  const openProp = () => {
    changeOpen(true);
  };

  // const newProp = (name:string) => {
  //   selectProp(name);
  // };

  const acceptProp = () => {
    dispatch(addProp({ name: selected }));
    closeModal();
  };

  const PropertiesList = (
    <div className={cls.propsWithButton}>
      <Button type={"submit"} onClick={openProp}>
        Properties
      </Button>
      {isOpen && (
        <ul className={cls.props}>
          {Properties.map((item: string) => {
            return (
              <li className={classNames({'activeProp' : item === selected})}>
                <Button onClick={() => selectProp(item)}>{item}</Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );

  const [modalIsOpen, setIsOpen] = useState(false);
  // Properties.find(element => element.name=selected)=undefined ? cls.propItem : propItemClick

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const ModalContent = (
    <div>
      <Input placeholder="Search..."></Input><br/>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">
            Create Property condition
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">Create JPQL condition</Dropdown.Item>
          <Dropdown.Item href="#/action-3">
            Create Group condition
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <br/>
      {PropertiesList}
      <Button classes={selectButton} onClick={acceptProp}>Select</Button>
      <Button classes={canselButton} onClick={closeModal}>Cancel</Button>
    </div>
  );

  return (
    <div>
      <Button type={"submit"} onClick={openModal}>
        Add search condition
      </Button>
      <Modal
        isOpen={modalIsOpen}
        title={'Add Condition'}
        onClose={closeModal}
      >{ModalContent}</Modal>
    </div>
  );
});

export default HistoryNav;
