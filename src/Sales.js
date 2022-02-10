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
                                />
                                <Card headline="Auto Shipping Tags"
                                      copy="Basic tasks can make a world of difference and that's what we did for one of our clients. They found it so annoying to have to switch between two different pieces of software to make a simple shipping tag after a job was complete. They asked Can't the computer just do it itself? We let them know we could make it do just that."/>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    );
}

export default Sales;