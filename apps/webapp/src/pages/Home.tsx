import { UIEnvironmentContext } from '@repo/ui/context/UIEnvironmentContext';
import { useContext } from 'react';

export const HomePage = () => {
  const { Button } = useContext(UIEnvironmentContext);
  return (
    <div>
      Home page
      <Button>Hello</Button>
    </div>
  )
};