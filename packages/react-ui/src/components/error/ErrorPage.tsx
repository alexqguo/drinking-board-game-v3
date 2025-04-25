import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

interface Props {
  error?: Error;
}

export const ErrorPage = ({ error }: Props) => {
  const ui = useUI();
  const { getMessage } = useI18n();

  const message = error?.message || getMessage('webapp_gameNotFound');

  return (
    <ui.PageContainer>
      <h1>
        <strong>
          <ui.Text fontSize={UISize.xl}>{message}</ui.Text>
        </strong>
      </h1>
    </ui.PageContainer>
  );
};
