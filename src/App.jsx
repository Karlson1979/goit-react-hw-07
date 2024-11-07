import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiGetContacts } from "./redux/contactsOps";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import Loader from "./components/Loader";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>PHONEBOOK</h1>

      <ContactForm />
      <SearchBox />
      {<Loader /> && <ContactList />}
    </div>
  );
};

export default App;
