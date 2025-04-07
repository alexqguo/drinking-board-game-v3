import { useContext } from 'react';
import { UIEnvironmentContext } from '../context/UIEnvironmentContext';

export const Introduction = () => {
  const ui = useContext(UIEnvironmentContext);

  return (
    <>
      <h1>
        <strong>
          <ui.Text fontSize='xl'>Drinking Board Game</ui.Text>
        </strong>
      </h1>

      <p>
        some random stuff. not an intro to the app. just assume people know
      </p>
    </>
  );
}