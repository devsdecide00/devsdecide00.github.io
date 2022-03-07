import './App.css';
import NavBar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";
import Overwhelmed from "./Overwhelmed";
import Sales from "./Sales";
import Solution from "./Solution";
import ContactUs from "./ContactUs";
import Results from "./Results";

function App() {
    return (
        <div >
            <div className={`h-screen grid 
            grid-rows-[2.5rem_1fr] md:grid-rows-[3rem_1fr] lg:grid-rows-[3.5rem_1fr] xl:grid-rows-[4rem_1fr]`}>
                <div><NavBar     classes="section-wrapper-padding  max-w-[1600px] h-1/2"/></div>
                <Hero />
            </div>
            <Overwhelmed    classes="section-wrapper-padding pt-10 lg:pt-40 pb-10 lg:pb-40 h-screen h-full  max-w-[1600px]"/>
            <Sales          classes="section-wrapper-padding pt-10 lg:pt-40 pb-10 lg:pb-40 h-screen h-full  max-w-[1600px]"/>
            <Solution       classes="section-wrapper-padding pt-10 lg:pt-40 pb-10 lg:pb-40 h-screen h-full  max-w-[1600px]"/>
            {/*<Results        classes="section-wrapper-padding pt-10 lg:pt-40 pb-10 lg:pb-40 h-screen h-full  max-w-[1600px]"/>*/}
            <ContactUs      classes="section-wrapper-padding pt-10 lg:pt-40 pb-10 lg:pb-40 h-screen h-full  max-w-[1600px]"/>
            <Footer         classes="section-wrapper-padding"/>
        </div>
    );
}

export default App;
