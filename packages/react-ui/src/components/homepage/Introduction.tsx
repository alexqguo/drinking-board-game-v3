import { useI18n } from '../../context/LocalizationContext';
import { useUI } from '../../context/UIEnvironmentContext';

export const Introduction = () => {
  const ui = useUI();
  const { getMessage } = useI18n();

  return (
    <>
      <h1>
        <strong>
          <ui.Text fontSize='xl'>{getMessage('webapp_dbg')}</ui.Text>
        </strong>
      </h1>

      <ui.Text fontSize='m'>
        {getMessage('webapp_intro')}
      </ui.Text>
    </>
  );
}