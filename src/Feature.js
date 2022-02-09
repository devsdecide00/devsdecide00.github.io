import Card from "./Card";

function Feature({classes}) {
    return (
        <section id="features">
            <div className={`${classes}`}>
                <h2 className="text-center">Sell More! Sell Faster!</h2>
                <div className="grid gap-8 lg:grid-cols-2 grid-cols-1 pb-10">
                    <Card headline="Unlock Your Business’ True Potential"/>
                    <Card headline="Tech We Use"/>
                </div>
                <div className="text-center">
                    <a href="#contact-us"
                       className="no-underline bg-cta-500 rounded-full py-2 md:py-3 px-4 md:px-5 font-bold inline-block hover:bg-cta-700">
                        Contact Us</a>
                </div>
            </div>
        </section>
    );
}

export default Feature;