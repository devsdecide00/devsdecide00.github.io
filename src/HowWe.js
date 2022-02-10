import Card from "./Card";

function HowWe({classes}) {
    return (
        <section id="how-we">
            <div className={`${classes}`}>
                <h2 className="text-center font-bold text-gray-400 section-header">We're Not Like Those <span className="text-white">Other</span> Software Companies</h2>
                <div className="grid gap-8 lg:grid-cols-3 grid-cols-1 pb-10">
                    <Card headline="A Clear Focus On Results"
                          copy={`From our first meeting to our last we will always ask "How is your business doing?" We do this not just to provide exceptional service but because we understand that as a business owner you don't want to waste money, you expect a return.  For this reason you'll never hear us talk about pricing with you until we know we can make a difference. Here is how a typical engagement works with us.`}
                          points={["Current business focus meeting", "Technological opportunities meeting", "Strategic ROI planning meeting", ]}
                          listIcon={`fa-solid fa-circle-check text-green-500`}
                          classes="col-span-2"/>
                    <Card headline="Tech We Use" doNotShowContactUs="true"/>
                </div>
            </div>
        </section>
    );
}

export default HowWe;