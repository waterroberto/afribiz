import React, { useEffect } from 'react';

export default function GoogleTranslateProvider({ children }) {
  useEffect(() => {
    function googleTranslateElementInit() {
      if (typeof window.google !== 'undefined') {
        new google.translate.TranslateElement(
          { pageLanguage: 'en' },
          'google_translate_element'
        );
      }
    }

    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');

    setTimeout(() => {
      script.setAttribute(
        'src',
        `//translate.google.com/translate_a/element.js?cb=${googleTranslateElementInit()}`
      );
    }, 1000);
  }, []);

  return (
    <>
      <div id='google_translate_element'></div>
      <script
        src='//translate.google.com/translate_a/element.js'
        async
      ></script>
      {children}
    </>
  );
}
