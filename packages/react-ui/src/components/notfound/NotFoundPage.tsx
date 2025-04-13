import { useUI } from '../../context/UIEnvironmentContext';

export const NotFoundPage = () => {
  const ui = useUI();

  return (
    <ui.PageContainer>
      <h1>
        <strong>
          <ui.Text fontSize='xl'>Game Not Found</ui.Text>
        </strong>
      </h1>
    </ui.PageContainer>
  );
}