import Authentification from '../components/Authentification';

function MyRecords() {
    const isUserConnected = () => {
        return localStorage.getItem('token') !== null;
      };
    
      return (
        <div style={{ marginBottom: 100 }}>
          {isUserConnected() ? (
            <h1>MY RECORDS TO COME</h1>
          ) : (
            <>
              <Authentification />
            </>
          )}
        </div>
      );
    }

export default MyRecords