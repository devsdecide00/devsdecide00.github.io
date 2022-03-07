import Card from "./Card";
import AlternateImgCard from "./AlternateImgCard";

function Overwhelmed({ classes }) {
    const card1 = (<Card headline="Supply Monitoring"
        copy="Have supply shortages forced you to constantly refresh your supplier's page to check their inventory?"
    />);
    const card2 = (<Card classes="" headline="Feeling Like You're Running A Training Business?"
        copy={`With a tight labor market, employee churn eats into profits. Just onboarding and training employees is a large expense in money and your time.`}
    />);

    const card3 = (<Card headline="Is Tedious Work Draining You?"
        copy="Having to do tedious tasks over and over and over zap your energy to run your business. Have you thought about creating some processes but don't know where to start?"
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