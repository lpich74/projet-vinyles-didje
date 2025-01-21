import '../styles/Footer.css'

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer>
            <p>© {currentYear} Les Vinyles de Didje</p>
        </footer>
    )
}

export default Footer