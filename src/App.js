import './App.css';
import NavBar from "./Navbar";
import Hero from "./Hero";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import Overwhelmed from "./Overwhelmed";
import Sales from "./Sales";
import Redefine from "./Redefine";
import HowWe from "./HowWe";

function App() {
    return (
        <div >
            <NavBar         classes="section-wrapper-padding"/>
            <Hero />
            <Sales          classes="section-wrapper-padding pt-40 pb-10 h-screen h-full"/>
            <Redefine       classes="section-wrapper-padding pt-40 pb-10 h-screen h-full"/>
            <Overwhelmed    classes="section-wrapper-padding pt-40 pb-10 h-screen h-full"/>
            <HowWe          classes="section-wrapper-padding pt-40 pb-10 h-screen h-full"/>
            <ContactUs      classes="section-wrapper-padding pt-40 pb-10 h-screen h-full"/>
            <Footer         classes="section-wrapper-padding"/>
        </div>
    );
}

export default App;
