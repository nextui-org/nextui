import React, { useState } from 'react';
import cn from 'classnames';
import { TypescriptLogo, JavascriptLogo } from '@components';
import { StyledPlaygroundButtons, StyledLanguageButton } from './styles';
import withDefaults from '@utils/with-defaults';
import { Language } from './types';

interface Props {
  initialLanguage?: Language;
  onChange?: (language: Language) => void;
}

const defaultProps = {
  initialLanguage: 'javascript'
};

export type LanguageSelectorProps = Props & typeof defaultProps;

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  initialLanguage,
  onChange
}) => {
  const [currentLanguage, setCurrentLanguage] =
    useState<Language>(initialLanguage);

  const handleToggle = () => {
    const newLanguage =
      currentLanguage === 'javascript' ? 'typescript' : 'javascript';
    setCurrentLanguage(newLanguage);
    onChange?.(newLanguage);
  };

  return (
    <StyledPlaygroundButtons bottom>
      <StyledLanguageButton onClick={handleToggle}>
        <JavascriptLogo
          className={cn('sp-language-icon', {
            'sp-language-icon--selected': currentLanguage === 'javascript'
          })}
        />
      </StyledLanguageButton>
      <StyledLanguageButton onClick={handleToggle}>
        <TypescriptLogo
          className={cn('sp-language-icon', {
            'sp-language-icon--selected': currentLanguage === 'typescript'
          })}
        />
      </StyledLanguageButton>
    </StyledPlaygroundButtons>
  );
};

export default withDefaults(LanguageSelector, defaultProps);
