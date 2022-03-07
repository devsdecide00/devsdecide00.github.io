import AlternateImgCard from "./AlternateImgCard";

function Results({ classes }) {
    const sectionTitle = (<h2>Check Out Our <span className="text-white">Results</span>!</h2>);
    return (
        <div>
            <AlternateImgCard classes={`${classes}`}
                id={`overwhelmed`}
                sectionTitle={sectionTitle}
                cardsWithImages={
                    []
                }
            >
            </AlternateImgCard>
        </div>
    );
}

export default Results;