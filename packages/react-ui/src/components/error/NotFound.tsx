import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

export const NotFound = () => {
  const ui = useUI();
  const { getMessage } = useI18n();

  return (
    <ui.PageContainer>
      <h1>
        <strong>
          <ui.Text fontSize={UISize.xl}>{getMessage('webapp_gameNotFound')}</ui.Text>
        </strong>
      </h1>
    </ui.PageContainer>
  );
}