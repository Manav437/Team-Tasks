import Link from "next/link";
import styles from "./dashboard.module.css";

export default function PageHeader({ title, description, section, actions, badge, parent }) {
    return <header className={styles.header}>
        <div className={styles.breadcrumb}>
            <span>Workspace</span>
            <span aria-hidden="true">/</span>
            {parent && <><Link href={parent.href} className="hover:text-ink hover:underline underline-offset-4">{parent.label}</Link><span aria-hidden="true">/</span></>}
            <span>{section || title}</span>
            {badge && <span className={styles.badge}>
                {badge}
            </span>}
        </div>
        <div className={styles.headingRow}>
            <div className={styles.heading}>
                <h1>{title}</h1>
                {/* <p>{description}</p>*/}
            </div>
            {actions && <div className={styles.actions}>{actions}</div>}
        </div>
    </header>;
}
