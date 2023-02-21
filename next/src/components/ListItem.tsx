import Link from "next/link";

export interface ListItemProps {
    content: string;
    href: string;
}

export function ListItem({ content, href }: ListItemProps) {
    return (
        <li><Link href={href}>{content}</Link></li>
    )
}