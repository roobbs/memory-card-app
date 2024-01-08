import logo from "../images/logo.webp";
export default function Header() {
  return (
    <header className="header">
      <div>MemoRick Card Game</div>
      <img src={logo} alt="logo" className="logo" />
    </header>
  );
}
