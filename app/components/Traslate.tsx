"use client"

import { useState, useRef, useEffect } from 'react'
import Script from 'next/script'

// Declaración para evitar error en TS
declare function doGTranslate(langPair: string): void;

const languages = {
  es: {
    label: "Spanish",
    flag: "/images/es.webp",
    translatePair: "es|es"
  },
  en: {
    label: "English",
    flag: "/images/en.webp",
    translatePair: "es|en"
  }
}


const Translate = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState<'es' | 'en'>('es')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  const changeLanguage = (lang: 'es' | 'en') => {
    doGTranslate(languages[lang].translatePair)
    setCurrentLang(lang)
    setDropdownOpen(false)
  }

  // Cierra el dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Cierra el dropdown al hacer scroll (útil en dispositivos móviles)
  useEffect(() => {
    const handleScroll = () => {
      setDropdownOpen(false)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      {/* Scripts de Google Translate */}
      <Script
        id="google-translate-init"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2"
        strategy="afterInteractive"
      />
      <Script id="google-translate-config" strategy="afterInteractive">
        {`
          function googleTranslateElementInit2() {
            new google.translate.TranslateElement({
              pageLanguage: 'es',
              autoDisplay: false
            }, 'google_translate_element2');
          }
        `}
      </Script>
      <Script id="doGTranslate" strategy="afterInteractive">
        {`
          function GTranslateFireEvent(element, event) {
            try {
              if (document.createEventObject) {
                var evt = document.createEventObject();
                element.fireEvent('on' + event, evt)
              } else {
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent(event, true, true);
                element.dispatchEvent(evt)
              }
            } catch (e) {}
          }
          function doGTranslate(lang_pair) {
            if(lang_pair.value) lang_pair = lang_pair.value;
            if(lang_pair=='') return;
            var lang = lang_pair.split('|')[1];
            var teCombo;
            var sel = document.getElementsByTagName('select');
            for(var i=0; i<sel.length; i++){
              if(sel[i].className.indexOf('goog-te-combo') !== -1){
                teCombo = sel[i];
                break;
              }
            }
            if(document.getElementById('google_translate_element2') === null || teCombo === null || teCombo.length==0){
              setTimeout(function(){ doGTranslate(lang_pair) }, 500);
            } else {
              teCombo.value = lang;
              GTranslateFireEvent(teCombo, 'change');
              GTranslateFireEvent(teCombo, 'change');
            }
          }
        `}
      </Script>

      {/* Dropdown en la esquina superior izquierda */}
      <div ref={dropdownRef} style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 999 }}>
        <div
          onClick={toggleDropdown}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none'
          }}
        >
          <img
            src={languages[currentLang].flag}
            alt={languages[currentLang].label}
            width="40"
            height="40"
            style={{ objectFit: 'cover' }}
          />
          <span style={{ marginLeft: '5px', color: '#000' }}>▼</span>
        </div>
        {dropdownOpen && (
          <div
            style={{
              marginTop: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              overflow: 'hidden',
              backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fondo semitransparente
              backdropFilter: 'blur(5px)',               // Efecto de desenfoque
              WebkitBackdropFilter: 'blur(5px)'            // Compatibilidad con Safari
            }}
          >
            {Object.entries(languages).map(([key, lang]) => (
              <div
                key={key}
                onClick={() => changeLanguage(key as 'es' | 'en')}
                style={{
                  padding: '5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <img
                  src={lang.flag}
                  alt={lang.label}
                  width="40"
                  height="40"
                  style={{ objectFit: 'cover' }}
                />
                <span style={{ marginLeft: '5px', color: '#000' }}>{lang.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Elemento para inicializar Google Translate */}
      <div id="google_translate_element2" style={{ display: 'none' }}></div>

      {/* Estilos globales para ocultar elementos de Google Translate */}
      <style jsx global>{`
        .skiptranslate,
        #goog-gt-tt,
        .goog-te-banner-frame,
        .goog-te-menu-frame {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
        #google_translate_element2 {
          display: none !important;
        }
      `}</style>
    </>
  )
}

export default Translate
