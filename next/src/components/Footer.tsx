interface FooterLinkProps {
    name: string;
    href: string;
    imageUrl: string;
    extraClasses?: string;
};

function FooterLink({ name, href, imageUrl, extraClasses = '' }: FooterLinkProps) {
    return (
        <li>
            <a className="footerlink block bg-primary-800 p-2 rounded-full" rel="me" href={href}>
                <img className={`h-5 w-5 ${extraClasses}`} src={imageUrl} alt={name} title={name} />
            </a>
        </li>
    )
}

export function Footer() {
    return (
        <footer className="footer p-8 m-auto lg:w-[800px] font-mono">
            <ul className="flex justify-center items-center gap-6">
                <FooterLink name="twitter" href="https://twitter.com/exdeejay_" imageUrl="/img/twitter_white.svg" />
                <FooterLink name="mastodon" href="https://furry.engineer/@deejay" imageUrl="/img/mastodon_white.svg" />
                <FooterLink name="github" href="https://github.com/exdeejay" imageUrl="/img/github.svg" extraClasses="invert" />
            </ul>
            <div className="my-4 text-center text-lg">powered by <a href="https://nextjs.org/">next.js</a></div>
        </footer>
    )
}