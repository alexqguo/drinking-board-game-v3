import { useI18n } from '../../context/LocalizationContext';
import { useUI } from '../../context/UIEnvironmentContext';

export const NotFound = () => {
  const ui = useUI();
  const { getMessage } = useI18n();

  return (
    <ui.PageContainer>
      <h1>
        <strong>
          <ui.Text fontSize='xl'>{getMessage('webapp_gameNotFound')}</ui.Text>
        </strong>
      </h1>
    </ui.PageContainer>
  );
}