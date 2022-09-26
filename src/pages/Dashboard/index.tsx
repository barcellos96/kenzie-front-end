import ModalNewContact from "../../components/modalNewContact";
import { useNavigate } from "react-router-dom";
import Login from "../Login";
import { useState } from "react";
import TableContacts from "../../components/cardContacts";

const Dashboard = () => {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

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
        <button onClick={() => setModal(true)}>adicionar contato</button>
        <button>perfil</button>
        <button onClick={handleLogout}>sair</button>

        {modal && <ModalNewContact />}
      </header>

      <TableContacts />
    </>
  );
};

export default Dashboard;
