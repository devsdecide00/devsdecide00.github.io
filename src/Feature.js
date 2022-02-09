import Card from "./Card";

function Feature({classes}) {
    return (
        <div className={`${classes}`}>
            <h1 className="text-center">Sell More! Sell Faster!</h1>

            <div className="grid gap-8 lg:grid-cols-2 grid-cols-1">
                <Card headline="Unlock Your Business’ True Potential" />
                <Card headline="Tech We Use" />
            </div>
            <div className="text-center">
                <a href="#contact-us" className="no-underline bg-orange-500 rounded-full py-2 md:py-3 px-4 md:px-5 font-bold inline-block hover:bg-orange-700">Contact Us</a>
            </div>
        </div>
    );
}

export default Feature;