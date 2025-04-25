import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

interface Props {
  error?: Error;
}

export const ErrorPage = ({ error }: Props) => {
  const ui = useUI();
  const { getMessage } = useI18n();

  const message = error?.name || getMessage('webapp_gameNotFound');

  return (
    <ui.PageContainer>
      <h1>
        <ui.Text fontSize={UISize.xl}>{message}</ui.Text>
      </h1>
      {error?.message && <ui.Col marginBottom={UISize.m}>{error.message}</ui.Col>}
      <a href="/">
        <ui.Button size={UISize.xs}>{getMessage('webapp_errorGoHome')}</ui.Button>
      </a>
    </ui.PageContainer>
  );
};
