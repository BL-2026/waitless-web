import { LANGUAGES, STRINGS } from "../translations/translations";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSelect() {
  const { setLanguage } = useLanguage();

  return (
    <div className="app-shell">
      <div className="screen screen-center">
        <p className="brand-mark">{STRINGS.fr.brand}</p>
        <h1 className="display-title">Langue · لغة</h1>
        <p className="lede">Choose your language</p>
        <div className="lang-list">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className="lang-button"
              onClick={() => setLanguage(lang.code)}
            >
              <span>{lang.native}</span>
              <span className="lang-code">{lang.code.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
