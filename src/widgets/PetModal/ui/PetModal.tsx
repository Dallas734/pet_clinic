import { memo, useState } from "react";
import cls from "./PetModal.module.scss";
import { Input } from "@/shared/ui/Input";
import { Modal } from "@/shared/ui/Modal";
import { Button } from "@/shared/ui/Button";
import classNames from "classnames";
import { Select, Option } from "@/shared/ui/Select";
import {Pet, PetsApi} from "@/entities/Pet";
import { PetTypesApi } from "@/entities/PetType";
import { OwnersApi } from "@/entities/Owners";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const PetModal = memo((props: ModalProps) => {
  const { isOpen, setIsOpen } = props;
  const [petName, setPetName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [ownerId, setOwnerId] = useState<string>("");
  const [petTypeId, setPetTypeId] = useState<string>("");
  const { data: petTypes } = PetTypesApi.useFetchAllPetTypesQuery();
  const { data: owners } = OwnersApi.useFetchAllOwnersQuery();
  const [createPet, result] = PetsApi.useCreatePetMutation();

  const petTypeOptions: Option[] = petTypes?.map((el) => ({
    value: el.id,
    label: el.name,
  })) as Option[];
  const ownerOptions: Option[] = owners?.map((el) => ({
    value: el.id,
    label: el.firstName,
  })) as Option[];

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

  const okButtonClasses = classNames(
    "icon",
    "crud",
    "border-radius",
    "okButton"
  ).split(" ");

  const handleSubmit = () => {
    const newPet: Pet = {
        identificationNumber: id,
        name: petName,
        birthdate: birthdate,
        owner: owners?.filter((el) => el.id === ownerId)[0],
        type: petTypes?.filter((el) => el.id === petTypeId)[0]
    }
    createPet(newPet);
    setIsOpen(false);
  };

  const ModalContent = (
    <div className={cls.modal}>
      <form onSubmit={handleSubmit}>
        <div className={cls.petName}>
          <label>Кличка</label>
          <Input onChange={setPetName} />
        </div>
        <div className={cls.block}>
          <div className={cls.field}>
            <label>Тип питомца</label>
            <Select data={petTypeOptions} onChange={setPetTypeId} />
          </div>
          <div className={cls.field}>
            <label>Владелец</label>
            <Select data={ownerOptions} onChange={setOwnerId} />
          </div>
          <div className={cls.field}>
            <label>ID</label>
            <Input onChange={setId} />
          </div>
          <div className={cls.field}>
            <label>Дата рождения</label>
            <Input type="date" onChange={setBirthdate}/>
          </div>
        </div>
        <div className={cls.buttons}>
          <Button children={"OK"} classes={okButtonClasses} type="submit" />
          <Button
            children={"Закрыть"}
            onClick={closeModal}
            classes={closeButtonClasses}
          />
        </div>
      </form>
    </div>
  );
  return (
    <Modal
      isOpen={isOpen}
      title="Питомец"
      onClose={closeModal}
      classes={classes}
    >
      {ModalContent}
    </Modal>
  );
});

export default PetModal;
