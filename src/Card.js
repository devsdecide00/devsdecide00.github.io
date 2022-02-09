function Card({headline, copy}) {
    return (
        <div className="rounded-2xl p-12 bg-purple-900 grid gap-12">
            <h3 className="font-thin">{headline}</h3>
            <p>{copy}</p>
            <div className="font-bold text-orange-500 self-end hover:text-orange-700 mr-auto hover:underline">
                <a className="content-end" href="contact-us.html">Contact Us</a>
            </div>
        </div>
    );
}

export default Card;