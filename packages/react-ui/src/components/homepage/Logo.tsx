import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { useScreenSize } from '../../hooks/useScreenSize';

export const Logo = () => {
  const ui = useUI();
  const { getMessage } = useI18n();
  const { screenSize } = useScreenSize();

  return (
    <h1>
      <strong style={{ textAlign: 'center' }}>
        <ui.Text fontSize={screenSize === 'l' ? UISize.xl : UISize.l}>
          {getMessage('webapp_d')}
          <br />
          {getMessage('webapp_bg')}
        </ui.Text>
      </strong>
    </h1>
  );
};
