function Card({headline, copy}) {
    return (
        <div className="rounded-2xl p-12 bg-purple-900 grid gap-12">
            <div className="font-thin text-4xl">{headline}</div>
            <div>{copy}</div>
            <div className="text-lg font-bold text-orange-500 self-end hover:text-orange-700 mr-auto hover:underline">
                <a className="content-end" href="contact-us.html">Contact Us</a>
            </div>
        </div>
    );
}

export default Card;