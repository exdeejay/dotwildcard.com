import Link from "next/link";
import { ReactNode } from "react";

export interface ListItemProps {
    href: string;
    children: ReactNode;
}

export function ListItem({ href, children }: ListItemProps) {
    return (
        <li className="mx-4"><Link href={href}>{children}</Link></li>
    )
}