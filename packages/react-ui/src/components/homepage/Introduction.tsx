import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

export const Introduction = () => {
  const ui = useUI();
  const { getMessage } = useI18n();

  return (
    <>
      <h1>
        <strong style={{ textAlign: 'center' }}>
          <ui.Text fontSize={UISize.xl}>
            {getMessage('webapp_d')}
            <br />
            {getMessage('webapp_bg')}
          </ui.Text>
        </strong>
      </h1>

      <ui.Text fontSize={UISize.m}>{getMessage('webapp_intro')}</ui.Text>
    </>
  );
};
