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
            <NavBar classes="max-w-7xl mx-auto px-4 md:px-8"/>
            <Hero />
            <UseCases classes="max-w-7xl mx-auto px-4 md:px-8 pt-40 pb-10"/>
            <Feature classes="max-w-7xl mx-auto px-4 md:px-8 pt-40 pb-10"/>
            <ContactUs classes="max-w-7xl mx-auto px-4 md:px-8 pt-40 pb-10"/>
            <Footer classes="max-w-7xl mx-auto px-4 md:px-8"/>
        </div>
    );
}

export default App;
