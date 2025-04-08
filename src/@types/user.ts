import { Dispatch, SetStateAction } from "react";

export interface User {
  name: string;
  email: string;
}

export type userCreated = {
  name: string;
  isCompleted: boolean;
};

export type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  cityHistory: cityHistoryType[] | null;
  setCityHistory: Dispatch<SetStateAction<cityHistoryType[] | null>>;
  actualCity: cityHistoryType | null;
  setActualCity: Dispatch<SetStateAction<cityHistoryType | null>>;
  setUpdateCityHistory: Dispatch<SetStateAction<boolean>>;
};

export type cityHistoryType = {
  id: number;
  name: string;
  state: string;
  slug: string;
  uf: string;
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
    houseNumber?: string;
    complement?: string;
    neighborhood?: string;
    state?: string;
    city?: string;
  };
  receiveNotification: boolean;
  userValid?: boolean;
};

export type FormState = {
  id?: string;
  name: string;
  CPF: string;
  maskedCPF?: string;
  DDD: string;
  phone: string;
  email: string;
  confirmEmail?: string;
  password: string;
  month: string;
  day: string;
  CEP: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  state: string;
  city: string;
  recieveNews: boolean;
};

export type inputFormRefs = {
  name: HTMLInputElement | null;
  cpf: HTMLInputElement | null;
  email: HTMLInputElement | null;
  confirmEmail: HTMLInputElement | null;
  password: HTMLInputElement | null;
};

export type inputPhoneRefs = {
  ddd: HTMLInputElement | null;
  phone: HTMLInputElement | null;
};

export type requiredInPassword = {
  letraMinuscula: boolean;
  letraMaiuscula: boolean;
  hasNumber: boolean;
  minimumLength: boolean;
};
