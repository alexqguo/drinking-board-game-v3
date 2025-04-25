import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

export const Introduction = () => {
  const ui = useUI();
  const { getMessage } = useI18n();

  return (
    <>
      <h1>
        <strong>
          <ui.Text fontSize={UISize.xl}>{getMessage('webapp_dbg')}</ui.Text>
        </strong>
      </h1>

      <ui.Text fontSize={UISize.m}>{getMessage('webapp_intro')}</ui.Text>
    </>
  );
};
