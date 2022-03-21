import React from 'react';
import cn from 'classnames';
import { SandpackPredefinedTemplate } from '@codesandbox/sandpack-react';
import { TypescriptLogo, JavascriptLogo } from '@components';
import { StyledPlaygroundButtons, StyledLanguageButton } from './styles';

interface Props {
  template: SandpackPredefinedTemplate;
  onChange?: (template: SandpackPredefinedTemplate) => void;
}

export type LanguageSelectorProps = Props;

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  template,
  onChange
}) => {
  const handleToggle = () => {
    const newTemplate = template === 'react' ? 'react-ts' : 'react';
    onChange?.(newTemplate);
  };

  return (
    <StyledPlaygroundButtons bottom>
      <StyledLanguageButton onClick={handleToggle}>
        <JavascriptLogo
          className={cn('sp-language-icon', {
            'sp-language-icon--selected': template === 'react'
          })}
        />
      </StyledLanguageButton>
      <StyledLanguageButton onClick={handleToggle}>
        <TypescriptLogo
          className={cn('sp-language-icon', {
            'sp-language-icon--selected': template === 'react-ts'
          })}
        />
      </StyledLanguageButton>
    </StyledPlaygroundButtons>
  );
};

export default LanguageSelector;
