import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Page } from "@/components/Page";
import { ReactNode } from "react";

interface ContactListItemProps {
    name: string;
    href: string;
    imageUrl: string;
    children: ReactNode;
}

function ContactListItem({ name, href, imageUrl, children }: ContactListItemProps) {
    return <li className="">
        <img className="inline-block h-10 w-10 m-4" src={imageUrl} alt={name} title={name} />
        <a className="inline-block" href={href}>{children}</a>
    </li>;
}

export default function Contact() {
    return <>
        <Page title='contact'>
            <ul className="mx-auto w-fit">
                <ContactListItem name="twitter" href="https://twitter.com/exdeejay_" imageUrl="/img/twitter_white.svg">@exdeejay_</ContactListItem>
                <ContactListItem name="mastodon" href="https://furry.engineer/@deejay" imageUrl="/img/mastodon_white.svg">@deejay@furry.engineer</ContactListItem>
                <ContactListItem name="telegram" href="https://t.me/exdeejay" imageUrl="/img/telegram.svg">@exdeejay</ContactListItem>
            </ul>
        </Page>
    </>
}