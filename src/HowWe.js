import Card from "./Card";

function HowWe({classes}) {
    return (
        <section id="how-we">
            <div className={`${classes}`}>
                <h2 className="text-center font-bold text-gray-400 section-header">Sell <span
                    className="text-white">More!</span> Sell <span className="text-white">Faster!</span></h2>
                <div className="grid gap-8 lg:grid-cols-3 grid-cols-1 pb-10">
                    <Card headline="Unlock Your Business’ True Potential"
                          classes="col-span-2"/>
                    <Card headline="Tech We Use" doNotShowContactUs="true"/>
                </div>
            </div>
        </section>
    );
}

export default HowWe;