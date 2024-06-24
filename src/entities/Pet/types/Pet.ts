import { Owner } from "@/entities/Owners";
import { PetType } from "@/entities/PetType";

export interface Pet {
    id?: string,
    name: string,
    identificationNumber: string,
    birthdate: string
    type?: PetType,
    owner?: Owner
}

