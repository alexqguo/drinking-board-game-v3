import { appActionsRegistry } from '../../context/AppActionsContext';
import { useUI } from '../../context/UIEnvironmentContext';
import { DonationWidget } from '../donation/DonationWidget';
import { CreateGameForm } from './CreateGameForm';
import { Introduction } from './Introduction';

const { beerMug } = appActionsRegistry.getItem('getMediaPaths')();

export const HomePageUI = () => {
  const ui = useUI();

  return (
    <ui.PageContainer>
      <Introduction />
      <CreateGameForm />
      <DonationWidget />
    </ui.PageContainer>
  );
};
