function Card({headline, copy, copy2, doNotShowContactUs, classes, points=[], listIcon, component, transparentBg}) {
    var contactUs = <div className="font-bold text-cta-500 self-end hover:text-white mr-auto hover:underline">
        <a className="content-end text-lg md:text-xl lg:text-2xl" href="#contact-us">Contact Us</a>
    </div>;
    if(doNotShowContactUs) {
        contactUs =<></>
    }
    var copyComp;
    if(copy !== undefined) {
        copyComp =<p className="text-gray-300">{copy}</p>;
    }
    var bgColor = `bg-purple-900/30`;
    if(transparentBg) {
        bgColor="";
    }
    var compCopy2;
    if(copy !== undefined) {
        compCopy2 =<p className="text-gray-300">{copy2}</p>
    }

    return (
        <div className={`rounded-2xl p-4 md:p-8 lg:p-12 grid gap-4 md:gap-8 lg:gap-12 ${bgColor} reveal cardgrid ${classes}`}>
            <h4 className="font-light text-gray-300">{headline}</h4>
            {copyComp}
            {component}
            <ul className={"feature-bullets w-full"}>
                {points.map((r, i) => <div className={`flex items-start gap-2`} key={i}><i className={`${listIcon} pt-1`} /><li className={`text-gray-300`}>{r}</li></div>)}
            </ul>
            {compCopy2}
            {/*{contactUs}*/}
        </div>
    );
}

export default Card;