import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../../service/api";

export type TCreateContact = {
  name: string;
  email: string;
  contact: string;
};

interface IRegisterContactData {
  RegisterContact(data: TCreateContact): Promise<object>;
  contacts: [];
  DeleteContactSelf(idContact: string): Promise<any>;
  modalNewContact: boolean;
  setModalNewContact: Function;
  DeleteUserSelf(idUser: string | null): Promise<any>;
}

interface IChildrenReact {
  children: ReactNode;
}

export const DashboardContext = createContext<IRegisterContactData>(
  {} as IRegisterContactData
);

export const DashboardProvider = ({ children }: IChildrenReact) => {
  const [contacts, setContacts] = useState<[]>([]);
  const [modalNewContact, setModalNewContact] = useState(false);

  const uid = localStorage.getItem("uid");

  const RegisterContact = async (data: TCreateContact) => {
    const responseContact = await api
      .post(`/users/contacts/${uid}`, data, {
        headers: {
          Authorization: `Baerer ${validationToken()}`,
        },
      })
      .then((res) => {
        setModalNewContact(false);
        ListContacts();
      })
      .catch((err) => {
        return err;
      });

    return responseContact;
  };

  const ListContacts = async () => {
    const responseListContacts = await api
      .get(`/users/me`, {
        headers: {
          Authorization: `Baerer ${validationToken()}`,
        },
      })
      .then((res) => {
        setContacts(res.data.contacts);

        return res.data;
      })
      .catch((err) => {
        return err;
      });

    return responseListContacts;
  };

  useEffect(() => {
    ListContacts();
  }, []);

  const DeleteContactSelf = async (idContact: string) => {
    const responseDeleteContactSelf = await api
      .delete(`/users/contacts/${uid}/${idContact}`, {
        headers: {
          Authorization: `Baerer ${validationToken()}`,
        },
      })
      .then((res) => {
        ListContacts();
      })
      .catch((err) => {
        return err;
      });

    console.log(responseDeleteContactSelf);

    return responseDeleteContactSelf;
  };

  const DeleteUserSelf = async (idUser: string) => {
    const responseDeleteUserSelf = await api
      .delete(`/users/me/${idUser}`, {
        headers: {
          Authorization: `Baerer ${validationToken()}`,
        },
      })
      .then((res) => {
        localStorage.clear();
        window.location.reload();
      })
      .catch((err) => {
        return err;
      });

    return responseDeleteUserSelf;
  };

  const validationToken = () => {
    return localStorage.getItem("token");
  };

  return (
    <DashboardContext.Provider
      value={{
        RegisterContact,
        contacts,
        DeleteContactSelf,
        modalNewContact,
        setModalNewContact,
        DeleteUserSelf,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
