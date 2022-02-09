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
            <NavBar         classes="mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20"/>
            <Hero />
            <Sales          classes="mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-40 pb-10 h-screen h-full"/>
            <Redefine       classes="mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-40 pb-10 h-screen h-full"/>
            <Overwhelmed    classes="mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-40 pb-10 h-screen h-full"/>
            <HowWe          classes="mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-40 pb-10 h-screen h-full"/>
            <ContactUs      classes="mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-40 pb-10 h-screen h-full"/>
            <Footer         classes="mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20"/>
        </div>
    );
}

export default App;
