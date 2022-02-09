import './App.css';
import NavBar from "./Navbar";
import Hero from "./Hero";
import UseCases from "./UseCases";
import Feature from './Feature';
import ContactUs from "./ContactUs";
import Footer from "./Footer";

function App() {
    return (
        <div >
            <NavBar     classes="mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20"/>
            <Hero />
            <UseCases   classes="mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-40 pb-10"/>
            <Feature    classes="mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-40 pb-10"/>
            <ContactUs  classes="mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-40 pb-10"/>
            <Footer     classes="mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20"/>
        </div>
    );
}

export default App;
