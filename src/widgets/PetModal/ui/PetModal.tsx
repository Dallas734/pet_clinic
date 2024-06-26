import { memo, useEffect, useState } from "react";
import cls from "./PetModal.module.scss";
import { Input } from "@/shared/ui/Input";
import { Modal } from "@/shared/ui/Modal";
import { Button } from "@/shared/ui/Button";
import classNames from "classnames";
import { Select, Option } from "@/shared/ui/Select";
import { Pet, PetsApi } from "@/entities/Pet";
import { PetTypesApi } from "@/entities/PetType";
import { OwnersApi } from "@/entities/Owners";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  pet?: Pet | undefined;
  queryType: string;
}

const PetModal = memo((props: ModalProps) => {
  const { isOpen, setIsOpen, pet, queryType } = props;
  const [petName, setPetName] = useState<string | undefined>(pet?.name);
  const [id, setId] = useState<string | undefined>(pet?.identificationNumber);
  const [birthdate, setBirthdate] = useState<string | undefined>(
    pet?.birthdate
  );
  const [ownerId, setOwnerId] = useState<string | undefined>(pet?.owner?.id);
  const [petTypeId, setPetTypeId] = useState<string | undefined>(pet?.type?.id);
  const { data: petTypes } = PetTypesApi.useFetchAllPetTypesQuery();
  const { data: owners } = OwnersApi.useFetchAllOwnersQuery();
  const [createPet] = PetsApi.useCreatePetMutation();
  const [updatePet] = PetsApi.useUpdatePetMutation();

  useEffect(() => {
    //console.log(pet)
    setPetName(pet?.name);
    setId(pet?.identificationNumber);
    setBirthdate(pet?.birthdate);
    setOwnerId(pet?.owner?.id);
    setPetTypeId(pet?.type?.id);
  }, [pet]);

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
    switch (queryType) {
      case "CREATE":
        const newPet: Pet = {
            identificationNumber: id,
            name: petName,
            birthdate: birthdate,
            owner: owners?.filter((el) => el.id === ownerId)[0],
            type: petTypes?.filter((el) => el.id === petTypeId)[0],
          };
        createPet(newPet);
        break;
      case "UPDATE":
        const newPetUp: Pet = {
            id: pet?.id,
            identificationNumber: id,
            name: petName,
            birthdate: birthdate,
            owner: owners?.filter((el) => el.id === ownerId)[0],
            type: petTypes?.filter((el) => el.id === petTypeId)[0],
          };
        updatePet(newPetUp);  
        break;
    }
    setIsOpen(false);
  };

  const ModalContent = (
    <div className={cls.modal}>
      <form onSubmit={handleSubmit}>
        <div className={cls.petName}>
          <label>Кличка</label>
          <Input onChange={setPetName} value={petName} />
        </div>
        <div className={cls.block}>
          <div className={cls.field}>
            <label>Тип питомца</label>
            <Select
              data={petTypeOptions}
              onChange={setPetTypeId}
              value={petTypeId}
            />
          </div>
          <div className={cls.field}>
            <label>Владелец</label>
            <Select data={ownerOptions} onChange={setOwnerId} value={ownerId} />
          </div>
          <div className={cls.field}>
            <label>ID</label>
            <Input onChange={setId} value={id} />
          </div>
          <div className={cls.field}>
            <label>Дата рождения</label>
            <Input type="date" onChange={setBirthdate} value={birthdate} />
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
