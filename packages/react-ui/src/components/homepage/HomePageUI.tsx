import { FC, useEffect, useState } from 'react';
import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { DonationWidget } from '../donation/DonationWidget';
import { CreateGameForm } from './CreateGameForm';
import { Logo } from './Logo';

interface Props {
  hasVisited: boolean;
  recordVisit: () => void;
}

export const HomePageUI: FC<Props> = ({ hasVisited = false, recordVisit }) => {
  const ui = useUI();
  const { getMessage } = useI18n();
  const [isSplashOpen, setIsSplashOpen] = useState(!hasVisited);

  const handleSplashInteraction = () => {
    recordVisit();
    setIsSplashOpen(false);
  };

  useEffect(() => {
    if (!isSplashOpen) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleSplashInteraction();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isSplashOpen]);

  return (
    <ui.Row>
      <ui.PageContainer>
        <ui.Col marginBottom={UISize.xl}>
          <Logo />
          {isSplashOpen && (
            <ui.Col alignItems="center" marginTop={UISize.xl}>
              <ui.Text fontSize={UISize.m}>
                <span
                  style={{
                    animation: 'fadeInOut 1.5s ease-in-out infinite',
                  }}
                >
                  {getMessage('webapp_pressEnter')}
                </span>
              </ui.Text>
              <style>{`
                @keyframes fadeInOut {
                  0%, 100% { opacity: 0.3; }
                  50% { opacity: 1; }
                }
              `}</style>
            </ui.Col>
          )}

          <div
            style={{
              transition: '0.5s',
              opacity: isSplashOpen ? 0 : 100,
              position: isSplashOpen ? 'absolute' : 'relative',
            }}
          >
            <ui.Text fontSize={UISize.m}>{getMessage('webapp_intro')}</ui.Text>
            <CreateGameForm />
            <ui.Row>
              <DonationWidget />
            </ui.Row>
          </div>
        </ui.Col>
      </ui.PageContainer>
    </ui.Row>
  );
};
