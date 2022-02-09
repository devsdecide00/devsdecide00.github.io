import Card from "./Card";

function Feature({classes}) {
    return (
        <section id="features">
            <div className={`${classes}`}>
                <h2 className="text-center font-bold text-gray-400">Sell <span className="text-white">More!</span> Sell <span className="text-white">Faster!</span></h2>
                <div className="grid gap-8 lg:grid-cols-3 grid-cols-1 pb-10">
                    <Card headline="Unlock Your Business’ True Potential" doNotShowContactUs="true" classes="col-span-2"/>
                    <Card headline="Tech We Use" doNotShowContactUs="true"/>
                </div>
                <div className="text-center">
                    <a href="#contact-us"
                       className="w-full sm:w-auto no-underline bg-cta-500 rounded-full py-2 md:py-3 px-4 md:px-5 font-bold inline-block hover:bg-cta-700">
                        Contact Us</a>
                </div>
            </div>
        </section>
    );
}

export default Feature;