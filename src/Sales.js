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
                                      copy={'Have you ever wanted to send the following emails or texts to your customers without lifting a finger?'}
                                      points={[" Customers like you also bought...", "It's been a while, are you running low on business cards?", "Chatting with a local realtor today and they said leaving flyers at open houses has increased their callbacks"]}
                                      copy2={'With customized emails based on your real sales you can become a business partner for your customers and not just a place to print'}
                                      listIcon={`fa-solid fa-money-bill-1 text-green-500`}
                                      classes={``}
                                />
                                <div className={`self-center mr-auto`}>
                                    <img src={`revenue.svg`} alt={``} className={`w-1/2`}/>
                                </div>
                                <div className={`self-center`}>
                                    <img src={`tedious.svg`} alt={``} className={`w-1/2 ml-auto`}/>
                                </div>
                                <Card headline="Cut The Tedious Work"
                                      copy="Not having to do tedious tasks over and over gives you more time to spend on your customers and your business. How would your shop feel with just these three things?"
                                      points={["Automatically generate shipping labels", "Automatically generate daily sales reports", "Automatically generate your new customer list"]}
                                      listIcon={`fa-solid fa-hourglass text-blue-300`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    );
}

export default Sales;