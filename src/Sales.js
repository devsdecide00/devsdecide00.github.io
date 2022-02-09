import Card from "./Card";

function Sales({classes}) {
    return (
        <section id="sales" className="">
                <div className={`${classes}`}>
                    <h2 className="text-center font-bold text-gray-400 section-header">Sell <span
                        className="text-white">More!</span> Sell <span className="text-white">Faster!</span></h2>
                    <div className="use-cases-overlay">
                        <div className="wrapper">
                            <div className="grid gap-8 lg:grid-cols-2 grid-cols-1">
                                <Card headline="Unlock More Revenue"
                                      copy='Wouldn    t it be great if you had your own "customers like you also" feature for your marketing? We have create custom email campaigns based several ERPs and invoicings to take techniques from large scale e-commerce companies and put them more hands'/>
                                <Card headline="Inventory Forecasting"
                                      copy='Have you ever had issues with determining the exact amount of inventory you need when supplies are short? We have created several custom reports for ERPs which let you take into account trends before your purchase a single ream.'/>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    );
}

export default Sales;