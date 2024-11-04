const Contact = ({ name, number, id, deleteContact }) => {
  return (
    <div>
      <p>
        {name}: {number}
      </p>
      <button onClick={() => deleteContact(id)}>Delete</button>
    </div>
  );
};

export default Contact;
