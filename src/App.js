import './App.css';
import NavBar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";
import Overwhelmed from "./Overwhelmed";
import Sales from "./Sales";
import HowWe from "./HowWe";

function App() {
    return (
        <div >
            <NavBar         classes="section-wrapper-padding  max-w-[1600px]"/>
            <Hero />
            <Sales          classes="section-wrapper-padding pt-40 pb-40 h-screen h-full  max-w-[1600px]"/>
            {/*<Redefine       classes="section-wrapper-padding pt-40 pb-10 h-screen h-full"/>*/}
            <Overwhelmed    classes="section-wrapper-padding pt-40 pb-40 h-screen h-full  max-w-[1600px]"/>
            <HowWe          classes="section-wrapper-padding pt-40 pb-10 h-screen h-full  max-w-[1600px]"/>
            {/*<ContactUs      classes="section-wrapper-padding pt-40 pb-10 h-screen h-full  max-w-[1600px]"/>*/}
            <Footer         classes="section-wrapper-padding"/>
        </div>
    );
}

export default App;
