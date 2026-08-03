// src/components/layout/LanguageTranslator.jsx
import { useEffect, useState, useCallback, useRef } from "react";
import './LanguageTranslator.css';

const LANGUAGES = [
  { code: "device", native: "Device Language", english: "Use device language (Recommended)" },
  { code: "en", native: "English", english: "English" },
  { code: "hi", native: "हिन्दी", english: "Hindi" },
  { code: "bho", native: "भोजपुरी", english: "Bhojpuri" },
  { code: "bn", native: "বাংলা", english: "Bengali" },
  { code: "te", native: "తెలుగు", english: "Telugu" },
  { code: "mr", native: "मराठी", english: "Marathi" },
  { code: "ta", native: "தமிழ்", english: "Tamil" },
  { code: "ur", native: "اردو", english: "Urdu" },
  { code: "pa", native: "ਪੰਜਾਬੀ", english: "Punjabi" },
  { code: "gu", native: "ગુજરાતી", english: "Gujarati" },
  { code: "kn", native: "ಕನ್ನಡ", english: "Kannada" },
  { code: "ml", native: "മലയാളം", english: "Malayalam" },
  { code: "es", native: "Español", english: "Spanish" },
  { code: "fr", native: "Français", english: "French" },
  { code: "de", native: "Deutsch", english: "German" },
  { code: "zh-CN", native: "中文 (简体)", english: "Chinese (Simplified)" },
  { code: "ja", native: "日本語", english: "Japanese" },
  { code: "ar", native: "العربية", english: "Arabic" },
  { code: "ru", native: "Русский", english: "Russian" },
  { code: "pt", native: "Português", english: "Portuguese" },
  { code: "it", native: "Italiano", english: "Italian" },
  { code: "ko", native: "한국어", english: "Korean" },
  { code: "tr", native: "Türkçe", english: "Turkish" },
  { code: "vi", native: "Tiếng Việt", english: "Vietnamese" },
  { code: "id", native: "Bahasa Indonesia", english: "Indonesian" },
  { code: "th", native: "ไทย", english: "Thai" },
  { code: "nl", native: "Nederlands", english: "Dutch" },
  { code: "pl", native: "Polski", english: "Polish" },
  { code: "uk", native: "Українська", english: "Ukrainian" },
  { code: "fa", native: "فارسی", english: "Persian" },
  { code: "ro", native: "Română", english: "Romanian" },
  { code: "el", native: "Ελληνικά", english: "Greek" },
  { code: "hu", native: "Magyar", english: "Hungarian" },
  { code: "cs", native: "Čeština", english: "Czech" },
  { code: "sv", native: "Svenska", english: "Swedish" },
  { code: "he", native: "עברית", english: "Hebrew" },
  { code: "ms", native: "Bahasa Melayu", english: "Malay" },
  { code: "fil", native: "Filipino", english: "Filipino" },
  { code: "af", native: "Afrikaans", english: "Afrikaans" },
  { code: "sq", native: "Shqip", english: "Albanian" },
  { code: "am", native: "አማርኛ", english: "Amharic" },
  { code: "hy", native: "Հայերեն", english: "Armenian" },
  { code: "as", native: "অসমীয়া", english: "Assamese" },
  { code: "ay", native: "Aymara", english: "Aymara" },
  { code: "az", native: "Azərbaycan", english: "Azerbaijani" },
  { code: "bm", native: "Bamanankan", english: "Bambara" },
  { code: "eu", native: "Euskara", english: "Basque" },
  { code: "be", native: "Беларуская", english: "Belarusian" },
  { code: "bs", native: "Bosanski", english: "Bosnian" },
  { code: "bg", native: "Български", english: "Bulgarian" },
  { code: "ca", native: "Català", english: "Catalan" },
  { code: "ceb", native: "Cebuano", english: "Cebuano" },
  { code: "ny", native: "Chichewa", english: "Chichewa" },
  { code: "co", native: "Corsu", english: "Corsican" },
  { code: "hr", native: "Hrvatski", english: "Croatian" },
  { code: "da", native: "Dansk", english: "Danish" },
  { code: "dv", native: "ދިވެހި", english: "Dhivehi" },
  { code: "doi", native: "डोगरी", english: "Dogri" },
  { code: "eo", native: "Esperanto", english: "Esperanto" },
  { code: "et", native: "Eesti", english: "Estonian" },
  { code: "ee", native: "Eʋegbe", english: "Ewe" },
  { code: "fi", native: "Suomi", english: "Finnish" },
  { code: "fy", native: "Frysk", english: "Frisian" },
  { code: "gl", native: "Galego", english: "Galician" },
  { code: "ka", native: "ქართული", english: "Georgian" },
  { code: "gn", native: "Guarani", english: "Guarani" },
  { code: "ht", native: "Kreyòl ayisyen", english: "Haitian Creole" },
  { code: "ha", native: "Hausa", english: "Hausa" },
  { code: "haw", native: "ʻŌlelo Hawaiʻi", english: "Hawaiian" },
  { code: "hmn", native: "Hmoob", english: "Hmong" },
  { code: "is", native: "Íslenska", english: "Icelandic" },
  { code: "ig", native: "Igbo", english: "Igbo" },
  { code: "ilo", native: "Iloko", english: "Ilocano" },
  { code: "ga", native: "Gaeilge", english: "Irish" },
  { code: "jw", native: "Basa Jawa", english: "Javanese" },
  { code: "kk", native: "Қазақ тілі", english: "Kazakh" },
  { code: "km", native: "ខ្មែរ", english: "Khmer" },
  { code: "rw", native: "Kinyarwanda", english: "Kinyarwanda" },
  { code: "gom", native: "कोंकणी", english: "Konkani" },
  { code: "kri", native: "Krio", english: "Krio" },
  { code: "ku", native: "Kurdî", english: "Kurdish" },
  { code: "ckb", native: "کوردی (سۆرانی)", english: "Kurdish (Sorani)" },
  { code: "ky", native: "Кыргызча", english: "Kyrgyz" },
  { code: "lo", native: "ລາວ", english: "Lao" },
  { code: "la", native: "Latina", english: "Latin" },
  { code: "lv", native: "Latviešu", english: "Latvian" },
  { code: "ln", native: "Lingála", english: "Lingala" },
  { code: "lt", native: "Lietuvių", english: "Lithuanian" },
  { code: "lg", native: "Luganda", english: "Luganda" },
  { code: "lb", native: "Lëtzebuergesch", english: "Luxembourgish" },
  { code: "mk", native: "Македонски", english: "Macedonian" },
  { code: "mai", native: "मैथिली", english: "Maithili" },
  { code: "mg", native: "Malagasy", english: "Malagasy" },
  { code: "mt", native: "Malti", english: "Maltese" },
  { code: "mi", native: "Māori", english: "Maori" },
  { code: "lus", native: "Mizo", english: "Mizo" },
  { code: "mn", native: "Монгол", english: "Mongolian" },
  { code: "my", native: "မြန်မာစာ", english: "Myanmar (Burmese)" },
  { code: "ne", native: "नेपाली", english: "Nepali" },
  { code: "no", native: "Norsk", english: "Norwegian" },
  { code: "or", native: "ଓଡ଼ିଆ", english: "Odia (Oriya)" },
  { code: "om", native: "Oromoo", english: "Oromo" },
  { code: "ps", native: "پښتو", english: "Pashto" },
  { code: "qu", native: "Quechua", english: "Quechua" },
  { code: "sm", native: "Samoan", english: "Samoan" },
  { code: "sa", native: "संस्कृतम्", english: "Sanskrit" },
  { code: "gd", native: "Gàidhlig", english: "Scots Gaelic" },
  { code: "nso", native: "Sesotho sa Leboa", english: "Sepedi" },
  { code: "sr", native: "Српски", english: "Serbian" },
  { code: "st", native: "Sesotho", english: "Sesotho" },
  { code: "sn", native: "Shona", english: "Shona" },
  { code: "sd", native: "سنڌي", english: "Sindhi" },
  { code: "si", native: "සිංහල", english: "Sinhala" },
  { code: "sk", native: "Slovenčina", english: "Slovak" },
  { code: "sl", native: "Slovenščina", english: "Slovenian" },
  { code: "so", native: "Soomaali", english: "Somali" },
  { code: "su", native: "Basa Sunda", english: "Sundanese" },
  { code: "sw", native: "Kiswahili", english: "Swahili" },
  { code: "tg", native: "Тоҷикӣ", english: "Tajik" },
  { code: "tt", native: "Татар", english: "Tatar" },
  { code: "ti", native: "ትግርኛ", english: "Tigrinya" },
  { code: "ts", native: "Xitsonga", english: "Tsonga" },
  { code: "tk", native: "Türkmen dili", english: "Turkmen" },
  { code: "ak", native: "Twi", english: "Twi" },
  { code: "ug", native: "ئۇيغۇرچە", english: "Uyghur" },
  { code: "uz", native: "O'zbek", english: "Uzbek" },
  { code: "cy", native: "Cymraeg", english: "Welsh" },
  { code: "xh", native: "isiXhosa", english: "Xhosa" },
  { code: "yi", native: "ייִדיש", english: "Yiddish" },
  { code: "yo", native: "Yorùbá", english: "Yoruba" },
  { code: "zu", native: "isiZulu", english: "Zulu" }
];

export default function GoogleTranslateButton() {
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(localStorage.getItem("appLang") || "device");
  const [isScriptLoaded, setIsScriptLoaded] = useState(window.__gtLoaded || false);
  const scriptRequestRef = useRef(false);

  const getTargetCode = (code) => {
    if (code !== "device") return code;
    return (navigator.language || navigator.userLanguage || "en").split("-")[0];
  };

  const updateGoogleCombo = useCallback((langCode) => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = getTargetCode(langCode);
      select.dispatchEvent(new Event("change"));
      return true;
    }
    return false;
  }, []);

  const initGoogleTranslate = () => {
    setOpen(true);

    if (isScriptLoaded || scriptRequestRef.current) {
      updateGoogleCombo(selectedLang);
      return;
    }

    scriptRequestRef.current = true;
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );

      window.__gtLoaded = true;
      setIsScriptLoaded(true);

      const interval = setInterval(() => {
        if (updateGoogleCombo(selectedLang)) clearInterval(interval);
      }, 400);
    };

    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (selectedLang !== "device" && !isScriptLoaded) {
      const timer = setTimeout(initGoogleTranslate, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const changeLanguage = (lang) => {
    localStorage.setItem("appLang", lang);
    setSelectedLang(lang);
    setOpen(false);
    updateGoogleCombo(lang);
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }} />
      <button className="notranslate btn btn-sm border-0 d-flex align-items-center gap-1 p-2 text-secondary" onClick={initGoogleTranslate}>
        <i className="bi bi-translate fs-5 text-primary"></i>
        <span className="d-lg-none small fw-bolder">Language</span>
      </button>

      <div className={`gt-overlay ${open ? "active" : ""}`} onClick={() => setOpen(false)}>
        <div className="gt-sheet" onClick={(e) => e.stopPropagation()}>
          <div className="gt-drag-handle" />

          <div className="gt-header notranslate mt-5 ps-4" translate="no">
            <button className="gt-close-btn" onClick={() => setOpen(false)}>
              <i className="bi bi-arrow-left"></i>
            </button>
            <h6 className="m-0 fw-bold">Select Language</h6>
            {!isScriptLoaded && <small className="text-muted ms-auto pe-4">Loading engine...</small>}
          </div>

          <div className="gt-body notranslate" translate="no">
            {LANGUAGES.map((lang) => (
              <div
                key={lang.code}
                className={`gt-row ${selectedLang === lang.code ? "selected-bg" : ""}`}
                onClick={() => changeLanguage(lang.code)}
              >
                <div className="gt-left">
                  <div className={`gt-radio text-start ${selectedLang === lang.code ? "active" : ""}`}>
                    {selectedLang === lang.code && <div className="gt-radio-inner" />}
                  </div>
                  <div>
                    <div className="native text-start">{lang.native}</div>
                    <div className="english">{lang.english}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}