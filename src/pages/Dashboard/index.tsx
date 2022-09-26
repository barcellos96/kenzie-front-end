import ModalNewContact from "../../components/modalNewContact";
import { useNavigate } from "react-router-dom";
import Login from "../Login";
import { useContext, useState } from "react";
import TableContacts from "../../components/cardContacts";
import { DashboardContext } from "../../providers/Dashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const { modalNewContact, setModalNewContact } = useContext(DashboardContext);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!localStorage.getItem("token")) {
    return <Login />;
  }

  return (
    <>
      <header>
        <span>DASHBOARD</span>
        <button onClick={() => setModalNewContact(true)}>
          adicionar contato
        </button>
        <button>deletar conta</button>
        <button onClick={handleLogout}>sair</button>

        {modalNewContact && <ModalNewContact />}
      </header>

      <TableContacts />
    </>
  );
};

export default Dashboard;
