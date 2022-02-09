function Card({headline, copy}) {
    return (
        <div className="rounded-2xl p-4 md:p-8 lg:p-12 grid gap-4 md:gap-8 lg:gap-12 bg-purple-900/30 reveal">
            <h3 className="font-thin">{headline}</h3>
            <p>{copy}</p>
            <div className="font-bold text-cta-500 self-end hover:text-cta-700 mr-auto hover:underline">
                <a className="content-end text-lg md:text-xl lg:text-2xl" href="#contact-us">Contact Us</a>
            </div>
        </div>
    );
}

export default Card;