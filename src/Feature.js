import Card from "./Card";
import ContactUCTA from "./ContactUCTA";

function Feature({classes}) {
    return (
        <section id="features">
            <div className={`${classes}`}>
                <h2 className="text-center font-bold text-gray-400 section-header">Sell <span className="text-white">More!</span> Sell <span className="text-white">Faster!</span></h2>
                <div className="grid gap-8 lg:grid-cols-3 grid-cols-1 pb-10">
                    <Card headline="Unlock Your Business’ True Potential" doNotShowContactUs="true" classes="col-span-2"/>
                    <Card headline="Tech We Use" doNotShowContactUs="true"/>
                </div>
                <ContactUCTA />
            </div>
        </section>
    );
}

export default Feature;