import Header from "./Header";
import Footer from "./Footer";
import '../styles/Layout.css'

const Layout = ({ children }) => {
    return (
      <div className='header-main-footer'>
          <div className='header-main'>
              <Header />
              <main className='main-column'>
                {children}
              </main>
          </div>
        <Footer />
      </div>
    );
  };
  
  export default Layout;