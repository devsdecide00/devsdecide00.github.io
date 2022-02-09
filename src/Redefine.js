import Card from "./Card";

function Redefine({classes}) {
    return (
        <section id="redefine" className="">
                <div className={`${classes}`}>
                    <h2 className="text-center font-bold text-gray-400 section-header"><span
                        className="text-white">Redefine</span> Your Business</h2>
                    <div className="use-cases-overlay">
                        <div className="wrapper">
                            <div className="grid gap-8 lg:grid-cols-2 grid-cols-1">
                                <Card headline="Manage Profit Margins"
                                      copy='Do you have a web of spreadsheets in order to keep track of basic business metrics? We have done several integrations with big-name as well as obscure invoicing and payment systems that can link into your inventory system. So with a single click, you can answer the simple question "Am I making money on these jobs?"'/>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    );
}

export default Redefine;