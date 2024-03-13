import FormAddRecord from '../components/FormAddRecord';
import Authentification from '../components/Authentification';
import '../styles/AddARecord.css';

function AddARecord() {
  const isUserConnected = () => {
    return localStorage.getItem('token') !== null;
  };

  return (
    <div style={{ marginBottom: 100 }}>
      {isUserConnected() ? (
        <FormAddRecord />
      ) : (
        <>
          <Authentification />
        </>
      )}
    </div>
  );
}

export default AddARecord;