import Card from "./Card";
import AlternateImgCard from "./AlternateImgCard";

function Sales({ classes }) {
    const card1 = (<Card headline="Never Run Out Of Supplies"
                         copy='Remove the headaches at guessing the exact amount of inventory you need and have an easy link to your suppliers.'
    />);
    const card2 = (<Card headline="Cut The Tedious Work Out Of Your Day"
        copy="Don't waste time on things that can be automated for you."
    />);
    const card3 = (<Card headline="Lift Sales At A Click Of A Button"
                         copy={'Using your own sales data you can delivered information so useful your customers will no longer see you as a place to print but as a business partner.'}
    />);
    const sectionTitle = (<h2>Run Your Business In <span className="text-white">Half</span> The Time With More <span className="text-white">Profits</span></h2>);
    return (
        <div>
            <AlternateImgCard classes={`${classes}`}
                id={`sales`}
                sectionTitle={sectionTitle}
                cardsWithImages={
                    [{
                        "card": card1,
                        "imageURI": "automate-future.svg"
                    },
                    {
                        "card": card2,
                        "imageURI": "funnel.svg",
                        "imgClasses": "w-[55%]"
                    },
                    {
                        "card": card3,
                        "imageURI": "revenue.svg",
                        "imgClasses": "w-[55%]"
                    },
                    ]
                }
            >
            </AlternateImgCard>
        </div>
    );
}

export default Sales;