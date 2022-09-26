import { useContext } from "react";
import { DashboardContext } from "../../providers/Dashboard";

const TableContacts = () => {
  const { contacts, DeleteContactSelf } = useContext(DashboardContext);

  return (
    <table>
      <thead>
        {contacts.map((listContact: any) => (
          <tr key={listContact.id}>
            <th>{listContact.name} </th>
            <th>{listContact.email}</th>
            <th>
              {listContact.contact}
              <button onClick={() => DeleteContactSelf(listContact.id)}>
                delete
              </button>
            </th>
          </tr>
        ))}
      </thead>
    </table>
  );
};

export default TableContacts;
