import { useState } from 'react';
import FormAddRecord from '../components/FormAddRecord';
import Authentification from '../components/Authentification';
import '../styles/AddARecord.css'

function AddARecord() {
    const [showAuth, setShowAuth] = useState(false);

    return (
        <div style={{marginBottom: 100}}>
            <FormAddRecord />
            {showAuth && <Authentification />}
        </div>
    );
}

export default AddARecord;