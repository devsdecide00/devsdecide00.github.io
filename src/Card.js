function Card({headline, copy}) {
    return (
        <div className="rounded-2xl p-4 md:p-8 lg:p-12 bg-purple-900 grid gap-4 md:gap-8 lg:gap-12">
            <h3 className="font-thin">{headline}</h3>
            <p>{copy}</p>
            <div className="font-bold text-orange-500 self-end hover:text-orange-700 mr-auto hover:underline">
                <a className="content-end" href="#contact-us">Contact Us</a>
            </div>
        </div>
    );
}

export default Card;