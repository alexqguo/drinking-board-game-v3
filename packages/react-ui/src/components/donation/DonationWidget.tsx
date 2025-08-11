import { useMemo } from 'react';
import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { testIds } from '../../constants/testIds';

interface DonationWidgetProps {
  buttonText?: string;
}

export const DonationWidget = ({ buttonText }: DonationWidgetProps) => {
  const ui = useUI();
  const { getMessage } = useI18n();

  const kofi = useMemo(
    () => (
      <iframe
        id="kofiframe"
        src="https://ko-fi.com/alexg31934/?hidefeed=true&widget=true&embed=true&preview=true"
        style={{
          border: 'none',
          width: '100%',
          padding: '4px',
          background: '#f9f9f9',
        }}
        height="500"
        title="alexg31934"
      />
    ),
    [],
  );

  const popover = useMemo(
    () => (
      <ui.Popover
        popoverTrigger={
          <ui.Button size={UISize.xs} data-testid={testIds.supportBtn}>
            {buttonText || getMessage('webapp_support')}
          </ui.Button>
        }
        popoverBody={kofi}
      />
    ),
    [buttonText, getMessage, ui.Button, ui.Popover, kofi],
  );

  return popover;
};
