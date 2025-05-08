import { FC } from 'react';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

interface Props {
  loadingText?: string;
}

export const FullPageLoader: FC<Props> = ({ loadingText }) => {
  const ui = useUI();
  return (
    <ui.Col alignItems="center" height="100vh" justifyContent="center">
      <ui.Spinner size={UISize.xl} />
      {loadingText}
    </ui.Col>
  );
};
