import ModalNewContact from "../../components/modalNewContact";
import { useNavigate } from "react-router-dom";
import Login from "../Login";
import { useContext } from "react";
import TableContacts from "../../components/cardContacts";
import { DashboardContext } from "../../providers/Dashboard";
import { RegisterContext } from "../../providers/Register";
import ModalUpdateUser from "../../components/modalUpdateUser";

const Dashboard = () => {
  const navigate = useNavigate();
  const { modalNewContact, setModalNewContact, DeleteUserSelf } =
    useContext(DashboardContext);

  const { modalUpdateUser, setModalUpdateUser } = useContext(RegisterContext);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleDeleteUser = () => {
    const idUser = localStorage.getItem("uid");
    DeleteUserSelf(idUser);
  };

  const handleOpenUpdateUserModal = () => {
    setModalNewContact(false);
    setModalUpdateUser(true);
  };

  const handleOpenNewContact = () => {
    setModalNewContact(true);
    setModalUpdateUser(false);
  };

  if (!localStorage.getItem("token")) {
    return <Login />;
  }

  return (
    <>
      <header>
        <span>DASHBOARD</span>
        <button onClick={handleOpenNewContact}>adicionar contato</button>
        <button onClick={handleOpenUpdateUserModal}>atualizar conta</button>
        <button onClick={handleDeleteUser}>deletar conta</button>
        <button onClick={handleLogout}>sair</button>

        {modalNewContact && <ModalNewContact />}

        {modalUpdateUser && <ModalUpdateUser />}
      </header>

      <TableContacts />
    </>
  );
};

export default Dashboard;
