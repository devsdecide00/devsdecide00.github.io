import Card from "./Card";

function UseCases({classes}) {
    return (
        <section id="use-cases" className="">
            <div className={`${classes}`}>
                <h2 className="text-center font-bold text-gray-400">
                    A Few Changes Could <span className="text-white">Redefine</span> Your Business
                </h2>
                <div className="use-cases-overlay">
                    <div className="wrapper">
                        <div className="grid gap-8 lg:grid-cols-2 grid-cols-1">
                            <Card headline="Manage Profit Margins"
                                  copy='Do you have a web of spreadsheets in order to keep track of basic business metrics? We have done several integrations with big-name as well as obscure invoicing and payment systems that can link into your inventory system. So with a single click, you can answer the simple question "Am I making money on these jobs?"'/>
                            <Card headline="Unlock More Revenue"
                                  copy='Wouldn    t it be great if you had your own "customers like you also" feature for your marketing? We have create custom email campaigns based several ERPs and invoicings to take techniques from large scale e-commerce companies and put them more hands'/>
                            <Card headline="Inventory Forecasting"
                                  copy='Have you ever had issues with determining the exact amount of inventory you need when supplies are short? We have created several custom reports for ERPs which let you take into account trends before your purchase a single ream.'/>
                            <Card headline="Remove Long Training"
                                  copy='Onboarding a new employee is complicated enough when you are teaching them your business add on top of that all the software you use to run your business and it can get out of control. We have created several integrations that have remove tons of manual steps and reduced the amount of knowledge needed to onboard employees.'/>
                            <Card headline="Supply Monitoring"
                                  copy="Have supply shortages forced you to constantly refresh your supplier's page to check their inventory? We have created custom integrations for suppliers so that you get alerted as soon as the supplies you need are available."/>
                            <Card headline="Auto Shipping Tags"
                                  copy="Basic tasks can make a world of difference and that's what we did for one of our clients. They found it so annoying to have to switch between two different pieces of software to make a simple shipping tag after a job was complete. They asked Can't the computer just do it itself? We let them know we could make it do just that."/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UseCases;