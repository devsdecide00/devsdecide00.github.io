import Card from "./Card";

function Solution({classes}) {
    return (
        <section id="solution">
            <div className={`${classes}`}>
                <h2 className="text-center font-bold text-gray-400 section-header">Let Us <span className="text-white">Automate</span> Your Systems</h2>
                <div className="grid gap-8 lg:grid-cols-3 grid-cols-1 pb-10">
                    <Card headline="Custom Reports"
                          points={["Automatically generate shipping labels", "Automatically generate daily sales reports", "Automatically generate your new customer list", " Customers like you also bought...", "It's been a while, are you running low on business cards?", "A local realtor stopped by today and said leaving flyers at open houses has increased their callbacks"]}
                          listIcon={`fa-solid fa-hourglass text-blue-300`}
                    />
                    <Card headline="Custom Integrations"
                          points={["We have created custom integrations for suppliers so that you get alerted as soon as the supplies you need are available.", "Marketing System", "Billing System", "Reporting System", "Procurement System", "Inventory System", "Updating Prices... because inflation", "... and that magical excel spreadsheet"]}
                          listIcon={`fa-solid fa-stop text-red-500`}
                    />
                    <Card headline="White Glove Software Setup"

                    />
                    <Card headline="Technology Strategy"

                    />
                </div>
            </div>
        </section>
    );
}

export default Solution;