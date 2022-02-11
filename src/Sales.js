import Card from "./Card";
import ContactUCTA from "./ContactUCTA";

function Sales({classes}) {
    return (
        <section id="sales" className="">
            <div className={`${classes}`}>
                <h2 className="font-bold text-gray-400 section-header">Sell <span
                    className="text-white">More!</span> Sell <span className="text-white">Faster!</span></h2>
                <div className="use-cases-overlay ">
                    <div className="wrapper">
                        <div className="grid gap-8 lg:grid-cols-2 grid-cols-1">
                            <Card headline="Unlock More Revenue"
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
                                <img src={`tedious.svg`} alt={``} className={`w-3/4 ml-auto`}/>
                            </div>
                            <Card headline="Cut The Tedious Work"
                                  copy="Not having to do tedious tasks over and over and over gives you more time to spend on your customers and your business."
                                  points={["Automatically generate shipping labels", "Automatically generate daily sales reports", "Automatically generate your new customer list"]}
                                  listIcon={`fa-solid fa-hourglass text-blue-300`}
                            />
                        </div>
                    </div>
                </div>
                <div className={`pt-8 md:pt-10 lg:pt-12 xl:pt-14 2xl:pt-16 4xl:pt-20`}>
                    <ContactUCTA/>
                </div>
            </div>
        </section>
    );
}

export default Sales;