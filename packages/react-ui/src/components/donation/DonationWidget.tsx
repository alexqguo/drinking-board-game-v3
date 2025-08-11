import { useMemo } from 'react';
import { testIds } from '../../constants/testIds';
import { useI18n } from '../../context/LocalizationContext';
import { UIEnvironment, UISize, useUI } from '../../context/UIEnvironmentContext';

interface DonationWidgetProps {
  buttonText?: string;
  buttonVariant?: React.ComponentProps<UIEnvironment['Button']>['variant'];
}

export const DonationWidget = ({ buttonText, buttonVariant = 'primary' }: DonationWidgetProps) => {
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
          <ui.Button size={UISize.xs} variant={buttonVariant} data-testid={testIds.supportBtn}>
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
