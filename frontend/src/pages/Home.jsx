import '../styles/Home.css';
import CoverBattleLosAngeles from '../assets/Battle_Los_Angeles.jpg'
import CoverNevermind from '../assets/Nevermind.webp'
import CoverHighwayToHell from '../assets/Highway_To_Hell.JPG'
import CoverNumberBeast from '../assets/Number_Beast.jpg'
import CoverDarkSideMoon from '../assets/Dark_Side_Moon.jpg'

function Home() {
    return (
        <section className='main-wrapper'>
            <h1 className='title-homepage'>Derniers Ajouts</h1>
            <div className='grid-homepage'>
                <img src={CoverBattleLosAngeles} alt='battle of los angleles' height={200} width={200} />
                <img src={CoverNevermind} alt='nevermind' height={200} width={200} />
                <img src={CoverHighwayToHell} alt='highway to hell' height={200} width={200} />
                <img src={CoverNumberBeast} alt='number of the beast' height={200} width={200} />
                <img src={CoverDarkSideMoon} alt='dark side moon' height={200} width={200} />
            </div>
        </section>
    )
}

export default Home;