import { useState } from "react";
import ModalNewContact from "../../components/modalNewContact";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  console.log("modal", modal);

  return (
    <>
      <header>
        <span>DASHBOARD</span>
        <button onClick={() => setModal(true)}>adicionar contato</button>
        <button>perfil</button>
        <button onClick={() => navigate("/")}>sair</button>

        {modal && <ModalNewContact />}
      </header>
    </>
  );
};

export default Dashboard;
