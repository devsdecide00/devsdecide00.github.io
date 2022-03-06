import './App.css';
import NavBar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";
import Overwhelmed from "./Overwhelmed";
import Sales from "./Sales";
import Solution from "./Solution";
import ContactUs from "./ContactUs";

function App() {
    return (
        <div >
            <NavBar         classes="section-wrapper-padding  max-w-[1600px]"/>
            <Hero />
            <Overwhelmed    classes="section-wrapper-padding pt-10 lg:pt-40 pb-10 lg:pb-40 h-screen h-full  max-w-[1600px]"/>
            <Sales          classes="section-wrapper-padding pt-10 lg:pt-40 pb-10 lg:pb-40 h-screen h-full  max-w-[1600px]"/>
            {/*<Redefine       classes="section-wrapper-padding pt-10 pb-10 h-screen h-full"/>*/}
            <Solution       classes="section-wrapper-padding pt-10 lg:pt-40 pb-10 lg:pb-40 h-screen h-full  max-w-[1600px]"/>
            <ContactUs      classes="section-wrapper-padding pt-10 lg:pt-40 pb-10 lg:pb-40 h-screen h-full  max-w-[1600px]"/>
            <Footer         classes="section-wrapper-padding"/>
        </div>
    );
}

export default App;
