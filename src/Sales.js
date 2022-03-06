import Card from "./Card";
import AlternateImgCard from "./AlternateImgCard";

function Sales({ classes }) {
    const card1 = (<Card headline="Cut The Tedious Work Out Of Your Day"
        copy="Don't waste time on things that can be automated for you."
    />);

    const card2 = (<Card headline="Never Run Out Of Supplies"
        copy='Have you ever had issues with determining the exact amount of inventory you need when supplies are short? We have created several custom reports for ERPs which let you take into account trends before your purchase a single ream.'
    />);
    const card3 = (<Card headline="Lift Sales At A Click Of A Button"
                         copy={'Using your own sales data you can delivered information so useful your customers will no longer see you as a place to print but as a business partner.'}
    />);
    const sectionTitle = (<h2>Run Your Business In <span className="text-white">Half</span> The Time With More <span className="text-white">Profits</span></h2>);
    return (
        <div>
            <AlternateImgCard classes={`${classes}`}
                sectionTitle={sectionTitle}
                cardsWithImages={
                    [{
                        "card": card1,
                        "imageURI": "funnel.svg"
                    },
                    {
                        "card": card2,
                        "imageURI": "automate-future.svg"
                    },
                    {
                        "card": card3,
                        "imageURI": "revenue.svg"
                    },
                    ]
                }
            >
            </AlternateImgCard>
        </div>
    );
}

export default Sales;