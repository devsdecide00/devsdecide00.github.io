import Card from "./Card";
import BookUCTA from "./BookUCTA";
import ContactUCTA from "./ContactUCTA";

function Solution({classes}) {
    return (
        <section id="solution">
            <div className={`${classes}`}>
                <h2 className="text-center font-bold text-gray-400 section-header">Let Us <span className="text-white">Automate</span> Your Systems</h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 pb-10">
                    <Card headline="Custom Reports"
                          points={["Generate daily sales reports", "Generate recent customer lists", " Generate sales reports based on different metrics: time to deliver, profit, revenue, etc"]}
                          listIcon={`fa-solid fa-hourglass text-blue-300`}
                    />
                    <Card headline="Link Your Systems"
                          points={["Marketing", "Billing", "Reporting", "Procurement", "Inventory"]}
                          listIcon={`fa-solid fa-link text-blue-500`}
                    />
                    <Card headline="Remove Simple Tasks"
                          points={["Generate shipping labels", "Updating prices", "Daily magical excel spreadsheet updates", "Custom sales workflows"]}
                          listIcon={`fa-solid fa-xmark text-red-500`}
                    />
                    <Card headline="Improve Existing Sales"
                          points={[" Have a customers like you also bought... system", "Create recurring orders (e.g business cards)", "Create customer loyalty programs" ]}
                          listIcon={`fa-solid fa-chart-line text-green-500`}
                    />
                    <Card headline="Setup Business Alerts"
                          points={["Alerted as soon as the supplies you need are available", "Automatically generate daily sales reports", "Automatically generate your new customer list"]}
                          listIcon={`fa-solid fa-bell text-yellow-500`}
                    />
                    <Card headline="White Glove Software Setup"
                          points={["Get help during YOUR working hours","100% satisfaction guarantee","Zero system update downtimes"]}
                          listIcon={`fa-solid fa-mitten text-white-500`}
                    />
                </div>
                <div className={`pt-8 md:pt-10 lg:pt-12 xl:pt-14 2xl:pt-16 4xl:pt-20 flex gap-4 justify-center`}>
                    <BookUCTA />
                    <ContactUCTA />
                </div>
            </div>
        </section>
    );
}

export default Solution;