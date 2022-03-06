function Card({headline, copy, copy2, classes, points=[], listIcon, component, transparentBg}) {
    var copyComp;
    if(copy !== undefined) {
        copyComp =<p className="text-gray-300">{copy}</p>;
    }
    var bgColor = `bg-purple-900/30`;
    if(transparentBg) {
        bgColor="";
    }
    var compCopy2;
    if(copy2 !== undefined) {
        compCopy2 =<p className="text-gray-300">{copy2}</p>
    }

    return (
        <div className={`rounded-2xl p-4 md:p-8 lg:p-12 ${bgColor} reveal      ${classes}`}>
            <h4 className="font-thin text-gray-300 pb-6">{headline}</h4>
            <div className={`grid gap-4 md:gap-8 lg:gap-8`}>
            {copyComp !== undefined ? copyComp :null}
            {component !== undefined ? component: null}
            {points !== undefined && points.length > 0 ?
                <ul className={"feature-bullets w-full"}>
                    {points.map((r, i) => <div className={`flex items-start gap-2`} key={i}><i
                        className={`${listIcon} pt-1`}/>
                        <li className={`text-gray-300`}>{r}</li>
                    </div>)}
                </ul>:null
            }
            {compCopy2 !== undefined ? compCopy2:null}
            </div>
        </div>
    );
}

export default Card;