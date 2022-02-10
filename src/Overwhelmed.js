import Card from "./Card";

function Overwhelmed({classes}) {
    return (
        <section id="overwhelmed">
            <div className={`${classes}`}>
                <h2 className="text-center font-bold text-gray-400 section-header">Stop Feeling <span
                    className="text-white">Overwhelmed</span></h2>
                <div className="use-cases-overlay">
                    <div className="wrapper">
                        <div className="grid gap-8 lg:grid-cols-2 grid-cols-1">
                            <Card headline="Supply Monitoring"
                                  copy="Have supply shortages forced you to constantly refresh your supplier's page to check their inventory? We have created custom integrations for suppliers so that you get alerted as soon as the supplies you need are available."/>
                            <Card classes="row-span-2" headline="Reduce Training Time"
                                  copy={`Onboarding and training a new employee is complicated enough. How much less training would you have to do if you didn't also have to teach your employees how the following system work too:`}
                                  points={["Marketing System", "Billing System", "Reporting System", "Procurement System", "Inventory System", "Updating Prices... because inflation", "... and that magical excel spreadsheet"]}
                                  listIcon={`fa-solid fa-hand text-red-500`}
                            />
                            <Card headline="Inventory Forecasting"
                                  copy='Have you ever had issues with determining the exact amount of inventory you need when supplies are short? We have created several custom reports for ERPs which let you take into account trends before your purchase a single ream.'/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Overwhelmed;