function Footer({classes}) {
    return (
        <div className={`h-16 text-center ${classes}`}>
            <span className={`opacity-30`}>
                Copyright © 2022 Developers Decide LLC
            </span>
            <div>
                <a className="text-xs opacity-30" href='https://www.freepik.com/vectors/job'>Job vector created by freepik - www.freepik.com</a>
            </div>
        </div>
    );
}

export default Footer;