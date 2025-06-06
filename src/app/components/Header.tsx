import stylesHeader from "../styles/Header.module.css";

export default function Header() {
  return (
    <header className={stylesHeader.header}>
      <h1 className={stylesHeader.siteTitle}>
        <span className={stylesHeader.coloredSpan}> &lt;</span>Visual{" "}
        <span className={stylesHeader.coloredSpan}>Code</span>
        <span className={stylesHeader.closeTag}>/&gt;</span>
      </h1>
      <p className={stylesHeader.tagline}>
        interactive animations to see algorithms under the hood
      </p>
    </header>
  );
}
