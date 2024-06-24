import { memo, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Modal } from "@/shared/ui/Modal";
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
  const [value, setValue] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [panelIsOpen, setPanelIsOpen] = useState(false);
  // const [openCreateProps, setPropIsOpen] = useState(false);
  // const [openCreateJPQL, setJPQLIsOpen] = useState(false);
  // const [openCreateGroup, setPGroupIsOpen] = useState(false);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [props, setProps] = useState([
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
  ]);

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
    "closeModalBtn",
    [cls.canselModal]
  ).split(" ");

  const searchButton = classNames("icon", "crud", "border-radius", [
    cls.search,
  ]).split(" ");

  const optionsButton = classNames("icon", "border-radius", [
    cls.optionsButton,
  ]).split(" ");

  const filterPropButton = classNames(
    [cls.resetFilter],
    "icon",
    "crud",
    "border-radius"
  ).split(" ");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const openProp = () => {
    isOpen === true ? changeOpen(false) : changeOpen(true);
  };

  const setPanel = () => {
    panelIsOpen === true ? setPanelIsOpen(false) : setPanelIsOpen(true);
  };

  const setDropdown = () => {
    dropdownIsOpen === true
      ? setDropdownIsOpen(false)
      : setDropdownIsOpen(true);
  };

  const acceptProp = () => {
    dispatch(addProp({ name: selected }));
    closeModal();
  };

  const PropertiesList = ({ value }: { value: string[] }) => {
    return (
      <div className={cls.propsWithButton}>
        <Button
          type={"submit"}
          classes={classNames(
            { [cls.unactiveProperty]: !isOpen },
            { [cls.activeProperty]: isOpen }
          ).split(" ")}
          onClick={openProp}
        >
          Properties
        </Button>
        {isOpen && (
          <ul className={cls.props}>
            {value.map((item: string) => {
              return (
                <li
                  className={classNames({
                    [cls.activeProp]: item === selected,
                  })}
                >
                  <Button
                    classes={[cls.modalProps]}
                    onClick={() => selectProp(item)}
                  >
                    {item}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  const ModalContent = (
    <div className={cls.modal}>
      <Input
        value={value}
        onChange={(value) => {
          setValue(value);
          setProps(
            Properties.map(
              (item) => item.match(new RegExp(value, "i"))?.input
            ).filter((element) => element !== undefined) as string[]
          );
        }}
        placeholder="Search..."
      ></Input>
      <br />
      <div>
        <Button
          classes={classNames("icon", "crud", "createButton", "border-radius", [
            cls.dropdown,
          ]).split(" ")}
          onClick={setDropdown}
        >
          Create
        </Button>
        <div className={cls.dropdownData}>
          {dropdownIsOpen && (
            <div>
              <Button classes={classNames([cls.optionUp]).split(" ")}>
                Create Property condition
              </Button>
              <Button classes={classNames([cls.option]).split(" ")}>
                Create JPQL condition
              </Button>
              <Button classes={classNames([cls.optionDown]).split(" ")}>
                Create Group condition
              </Button>
            </div>
          )}
        </div>
      </div>
      <br />
      <nav className={cls.nav}>
        <div className={cls.navList}></div>
      </nav>
      <PropertiesList value={props} />
      <div className={cls.modalButtons}>
        <Button classes={selectButton} onClick={acceptProp}>
          Select
        </Button>
        <Button classes={canselButton} onClick={closeModal}>
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className={panelIsOpen ? cls.openedPanel : cls.closedPanel}>
      <div className={cls.filterPanel}>
        <Button
          classes={classNames(
            { [cls.filterButtonOpen]: panelIsOpen },
            { [cls.filterButtonClosed]: !panelIsOpen }
          ).split(" ")}
          onClick={setPanel}
        ></Button>
        <p>Filter</p>
      </div>
      {panelIsOpen && (
        <div className={cls.filterDownPanel}>
          <Button classes={searchButton}>Search</Button>
          <Button classes={filterPropButton}></Button>
          <Button
            type={"submit"}
            classes={classNames([cls.conditionButton]).split(" ")}
            onClick={openModal}
          >
            Add search condition
          </Button>
          <Button
            classes={optionsButton}
          ></Button>
          <Modal
            classes={classNames([cls.modalOptions]).split(" ")}
            isOpen={modalIsOpen}
            title={"Add Condition"}
            onClose={closeModal}
          >
            {ModalContent}
          </Modal>
        </div>
      )}
    </div>
  );
});

export default FilterModal;
