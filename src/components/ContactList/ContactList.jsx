import { useDispatch, useSelector } from "react-redux";
import { apiDeleteContact } from "../../redux/contactsOps";
import { selectFilter } from "../../redux/filterSlice";
import {
  selectContacts,
  selectError,
  selectLoading,
} from "../../redux/contactsSlice";
import Contact from "../Contact/Contact";
import Loader from "../Loader";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  // Фильтрация контактов на основе введенного фильтра
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Функция для удаления контакта
  const handleDeleteContact = (contactId) => {
    dispatch(apiDeleteContact(contactId));
  };

  return (
    <div>
      {/* Лоадер отображается во время загрузки */}
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

      {/* Сообщение об ошибке */}
      {error && (
        <p>
          Oops, some error occurred: &quot;{error}&quot;. Please, try again
          later 🤷‍♂️.
        </p>
      )}

      {/* Отображение отфильтрованных контактов или сообщение, если их нет */}
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
