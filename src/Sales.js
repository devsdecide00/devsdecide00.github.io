import Card from "./Card";
import ContactUCTA from "./ContactUCTA";
import BookUCTA from "./BookUCTA";

function Sales({classes}) {
    return (
        <section id="sales" className="">
            <div className={`${classes}`}>
                <h2 className="font-bold text-gray-400 section-header">What if you could run your business in half the time without decreasing revenue</h2>
                <div className="use-cases-overlay lg:hidden">
                    <div className="wrapper">
                        <div className="grid gap-8 lg:grid-cols-2 grid-cols-1">
                            <div className={`self-center mr-auto`}>
                                <img src={`revenue.svg`} alt={``} className={`m-auto w-1/2`}/>
                            </div>
                            <Card headline="Unlock More Revenue Imagine 10% lift in sales at a click of a button"
                                  copy={'Have you ever wanted to send the following emails or texts to your customers without lifting a finger?'}
                                  points={[" Customers like you also bought...", "It's been a while, are you running low on business cards?", "A local realtor stopped by today and said leaving flyers at open houses has increased their callbacks"]}
                                  copy2={`Using your own sales data you can delivered information so useful your customers will no longer see you as a place to print but as a business partner`}
                                  listIcon={`fa-solid fa-money-bill-1 text-green-500`}
                                  classes={``}
                            />
                            <div className={`self-center`}>
                                <img src={`automate-future.svg`} alt={``} className={`m-auto w-1/2`}/>
                            </div>
                            <Card headline="Cut The Tedious Work"
                                  copy="Not having to do tedious tasks over and over and over boost your profits without decreasing your revenue."
                                  points={["Automatically generate shipping labels", "Automatically generate daily sales reports", "Automatically generate your new customer list"]}
                                  listIcon={`fa-solid fa-hourglass text-blue-300`}
                            />
                            <div className={`self-center`}>
                                <img src={`funnel.svg`} alt={``} className={`m-auto w-1/2`}/>
                            </div>
                            <Card headline="Inventory Forecasting"
                                  copy='Have you ever had issues with determining the exact amount of inventory you need when supplies are short? We have created several custom reports for ERPs which let you take into account trends before your purchase a single ream.'
                            />
                        </div>
                    </div>
                </div>
                <div className="use-cases-overlay hidden lg:block">
                    <div className="wrapper">
                        <div className="grid gap-8 lg:grid-cols-2 grid-cols-1">
                            <Card headline="Unlock More Revenue Imagine 10% lift in sales at a click of a button"
                                  copy={'Have you ever wanted to send the following emails or texts to your customers without lifting a finger?'}
                                  points={[" Customers like you also bought...", "It's been a while, are you running low on business cards?", "A local realtor stopped by today and said leaving flyers at open houses has increased their callbacks"]}
                                  copy2={`Using your own sales data you can delivered information so useful your customers will no longer see you as a place to print but as a business partner`}
                                  listIcon={`fa-solid fa-money-bill-1 text-green-500`}
                                  classes={``}
                            />
                            <div className={`self-center mr-auto`}>
                                <img src={`revenue.svg`} alt={``} className={`w-3/4`}/>
                            </div>
                            <div className={`self-center`}>
                                <img src={`automate-future.svg`} alt={``} className={`w-3/4 ml-auto`}/>
                            </div>
                            <Card headline="Cut The Tedious Work"
                                  copy="Not having to do tedious tasks over and over and over boost your profits without decreasing your revenue."
                                  points={["Automatically generate shipping labels", "Automatically generate daily sales reports", "Automatically generate your new customer list"]}
                                  listIcon={`fa-solid fa-hourglass text-blue-300`}
                            />
                            <Card headline="Inventory Forecasting"
                                  copy='Have you ever had issues with determining the exact amount of inventory you need when supplies are short? We have created several custom reports for ERPs which let you take into account trends before your purchase a single ream.'
                            />
                            <div className={`self-center mr-auto`}>
                                <img src={`funnel.svg`} alt={``} className={`w-3/4`}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`pt-8 md:pt-10 lg:pt-12 xl:pt-14 2xl:pt-16 4xl:pt-20 flex gap-4 justify-center`}>
                    <BookUCTA/>
                    <ContactUCTA/>
                </div>
            </div>
        </section>
    );
}

export default Sales;