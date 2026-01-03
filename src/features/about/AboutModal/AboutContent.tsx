import styles from "./AboutModal.module.css";

export const AboutContent = () => {

    const features = [
        "UI performance and render optimization",
        "Scalable component architecture",
        "Predictable async state flows",
        "UX responsiveness and perceived performance",
        "Clear handling of loading, error, and empty states",
    ];

    const liveDemoAspects = [
        "interaction latency",
        "scrolling and layout behavior",
        "loading strategies",
        "visual and state transitions",
    ];

    return (
        <main className={styles.page}>
            <header className={styles.header}>

                <p className={styles.lede}>
                    This site hosts live frontend demonstrations created by{" "}
                    <strong>Yaniv Jacob</strong>, focused on performance, UI architecture,
                    and UX quality.
                </p>

                <p>
                    The goal is not to showcase a product idea, but to demonstrate how
                    frontend systems behave under real interaction - rendering efficiency,
                    state-driven UI consistency, responsiveness, and user feedback.
                </p>

                <p>
                    The domain was intentionally kept familiar to reduce cognitive
                    overhead and keep attention on implementation decisions, not business
                    logic.
                </p>
            </header>

            <section className={styles.section}>
                <h2>What this project demonstrates</h2>

                <ul className={styles.list}>
                    {features.map((feature) => (
                        <li key={feature}>{feature}</li>
                    ))}
                </ul>

                <p className={styles.note}>
                    These are the same concerns that appear in production-grade frontend
                    systems, explored here in a focused and observable way.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Why a live demo</h2>

                <p>Code alone rarely tells the full story.</p>

                <p>A live application makes it possible to experience:</p>

                <ul className={styles.inlineList}>
                    {liveDemoAspects.map((aspect) => (
                        <li key={aspect}>{aspect}</li>
                    ))}
                </ul>

                <p>
                    All of which are critical to frontend quality at scale.
                </p>
            </section>

            <footer className={styles.footer}>
                <h2>Source &amp; further details</h2>

                <p>
                    The full source code, architectural notes, and implementation details
                    are available on my GitHub
                </p>
                <a href='https://github.com/Jacobs2Jacob' target='_blank'>https://github.com/Jacobs2Jacob</a>
            </footer>
        </main>
    );
}