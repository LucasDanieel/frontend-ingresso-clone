import { Dispatch, SetStateAction } from "react";

export interface User {
  name: string;
  email: string;
}

export type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>
};

export type UserDTO = {
  id?: string;
  name: string;
  cpf: string;
  phoneDdd: string;
  phoneNumber: string;
  email: string;
  password: string;
  dateOfBirth?: Date;
  address: {
    cep?: string;
    street?: string;
    houseNumber?: number;
    complement?: string;
    neighborhood?: string;
    state?: string;
    city?: string;
  };
  receiveNotification: boolean;
  userValid?: boolean
};
