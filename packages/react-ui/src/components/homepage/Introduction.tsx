import { useUI } from '../../context/UIEnvironmentContext';

export const Introduction = () => {
  const ui = useUI();

  return (
    <>
      <h1>
        <strong>
          <ui.Text fontSize='xl'>Drinking Board Game</ui.Text>
        </strong>
      </h1>

      <ui.Text fontSize='m'>
        some random stuff. not an intro to the app. just assume people know
      </ui.Text>
    </>
  );
}