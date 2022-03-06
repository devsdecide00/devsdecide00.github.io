import Card from "./Card";
import AlternateImgCard from "./AlternateImgCard";

function Overwhelmed({ classes }) {
    const card1 = (<Card headline="Supply Monitoring"
        copy="Have supply shortages forced you to constantly refresh your supplier's page to check their inventory? Tasks like these not only remind you of the current issues with supply chains but also zap your energy to run your business."
    />);
    const card2 = (<Card classes="" headline="Feels Like You're Running A Training Business?"
        copy={`With a tight labor market employee churn will eat into profits. Onboarding and training employees is vital to running an efficient business, but if you have too many things to teach it will take a long time to reap those efficiencies if ever.`}
    />);

    const card3 = (<Card headline="Cut The Tedious Work"
        copy="Not having to do tedious tasks over and over and over boost your profits without decreasing your revenue."
    />);
    const sectionTitle = (<h2>Feeling <span className="text-white">Overwhelmed</span> Is A Sign Of Lost <span className="text-white">Profits</span></h2>);
    return (
        <div>
            <AlternateImgCard classes={`${classes}`}
                id={`overwhelmed`}
                sectionTitle={sectionTitle}
                cardsWithImages={
                    [{
                        "card": card1,
                        "imageURI": "supplies.svg"
                    },
                    {
                        "card": card2,
                        "imageURI": "training.svg"
                    },
                    {
                        "card": card3,
                        "imageURI": "tedious.svg"
                    },
                    ]
                }
            >
            </AlternateImgCard>
        </div>
    );
}

export default Overwhelmed;