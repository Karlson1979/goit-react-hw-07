import { useDispatch, useSelector } from "react-redux";
import { apiDeleteContact } from "../../redux/contactsOps";
import {
  selectError,
  selectLoading,
  selectFilteredContacts, 
} from "../../redux/contactsSlice";
import Contact from "../Contact/Contact";
import Loader from "../Loader";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts); 
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  
  const handleDeleteContact = (contactId) => {
    dispatch(apiDeleteContact(contactId));
  };

  return (
    <div>
     
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Loader />
        </div>
      )}

      
      {error && (
        <p>
          Oops, some error occurred: &quot;{error}&quot;. Please, try again
          later 🤷‍♂️.
        </p>
      )}

      
      {!loading && !error && filteredContacts.length > 0
        ? filteredContacts.map((contact) => (
            <Contact
              key={contact.id}
              name={contact.name}
              number={contact.number}
              id={contact.id}
              deleteContact={handleDeleteContact}
            />
          ))
        : !loading && !error && <p>Контакты не найдены</p>}
    </div>
  );
};

export default ContactList;
