import Card from "./Card";
import AlternateImgCard from "./AlternateImgCard";

function Sales({ classes }) {
    const card1 = (<Card headline="Unlock More Revenue Imagine 10% lift in sales at a click of a button"
        copy={'Have you ever wanted to send the following emails or texts to your customers without lifting a finger?'}
        points={[" Customers like you also bought...", "It's been a while, are you running low on business cards?", "A local realtor stopped by today and said leaving flyers at open houses has increased their callbacks"]}
        copy2={`Using your own sales data you can delivered information so useful your customers will no longer see you as a place to print but as a business partner`}
        listIcon={`fa-solid fa-money-bill-1 text-green-500`}
        classes={``}
    />);
    const card2 = (<Card headline="Cut The Tedious Work"
        copy="Not having to do tedious tasks over and over and over boost your profits without decreasing your revenue."
        points={["Automatically generate shipping labels", "Automatically generate daily sales reports", "Automatically generate your new customer list"]}
        listIcon={`fa-solid fa-hourglass text-blue-300`}
    />);

    const card3 = (<Card headline="Inventory Forecasting"
        copy='Have you ever had issues with determining the exact amount of inventory you need when supplies are short? We have created several custom reports for ERPs which let you take into account trends before your purchase a single ream.'
    />);
    return (
        <div>
            <AlternateImgCard classes={`${classes}`}
                sectionTitle={`What if you could run your business in half the time without decreasing revenue`}
                cardsWithImages={
                    [{
                        "card": card1,
                        "imageURI": "revenue.svg"
                    },
                    {
                        "card": card2,
                        "imageURI": "automate-future.svg"
                    },
                    {
                        "card": card3,
                        "imageURI": "funnel.svg"
                    },
                    ]
                }
            >
            </AlternateImgCard>
        </div>
    );
}

export default Sales;