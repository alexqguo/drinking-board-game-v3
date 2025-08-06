import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Board } from './board/Board';
import { Prompt } from './prompts/Prompt';
import { RoleSelectionModal } from './RoleSelectionModal';

export const Game = () => {
  const userContext = useContext(UserContext);
  const showRoleSelection = userContext.selectedRole === null;

  return (
    <>
      {showRoleSelection ? <RoleSelectionModal isOpen={true} /> : <Prompt />}
      <Board />
    </>
  );
};
