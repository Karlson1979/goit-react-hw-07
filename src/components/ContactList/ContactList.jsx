import { useDispatch, useSelector } from "react-redux";
import {
  deleteContact,
  selectContacts,
  selectError,
  selectLoading,
} from "../../redux/contactsSlice";
import { selectFilter } from "../../redux/filterSlice";
import Contact from "../Contact/Contact";
import Loader from "../Loader";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
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
        : !loading &&
          !error && (
            <p>
              Oops, some error occurred: &quot;{error}&quot;. Please, try again
              later 🤷‍♂️.
            </p>
          )}
    </div>
  );
};

export default ContactList;
