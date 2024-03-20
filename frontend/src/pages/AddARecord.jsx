import FormAddRecord from '../components/FormAddRecord';
import Authentification from '../components/Authentification';
import { isUserConnected } from '../functions/Functions';
import '../styles/AddARecord.css';

function AddARecord() {
  return (
    <div style={{ marginBottom: 100 }}>
      {isUserConnected() ? (
        <FormAddRecord />
      ) : (
            <Authentification />
      )}
    </div>
  );
}

export default AddARecord;