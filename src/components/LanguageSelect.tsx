import { LANGUAGES, STRINGS } from "../translations/translations";
import { useLanguage } from "../context/LanguageContext";

// No props needed here (same as the JS version) — nothing to type.
export default function LanguageSelect() {
  const { setLanguage } = useLanguage();

  return (
    <div className="screen">
      <h1 className="title">{STRINGS.en.chooseLanguage}</h1>
      <div className="lang-list">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            className="lang-button"
            onClick={() => setLanguage(lang.code)}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}
