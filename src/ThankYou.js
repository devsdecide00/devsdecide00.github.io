import './App.css';
import { Link } from 'react-router-dom';

function ThankYou() {
    return (
        <div className={`grid text-center content-center h-screen gap-6`} id={`hero`}>
            <h3>Thank you, we will reach out soon.</h3>
            <Link className={`ctabtn no-underline bg-cta-700 rounded-full py-2 md:py-3 px-4 md:px-5 inline-block hover:bg-cta-800 text-center text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl w-1/3 m-auto `} to="/">Go Back</Link>
        </div>
    );
}

export default ThankYou;
