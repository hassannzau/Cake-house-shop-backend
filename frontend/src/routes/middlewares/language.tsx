import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import i18n, { supportedLngs } from '@/i18n';

interface Props {
  children: React.ReactNode;
}

const LanguageMiddleware = ({ children }: Props) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    const pathLang = pathname.split('/')[1];

    if (!pathLang || supportedLngs.indexOf(pathLang) === -1) {
      return navigate(`/${i18n.language}${pathname}`, { replace: true });
    }

    if (pathLang !== i18n.language) {
      i18n.changeLanguage(pathLang);
      localStorage.setItem('LANG', pathLang);
    }
  }, [pathname, navigate]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default LanguageMiddleware;
