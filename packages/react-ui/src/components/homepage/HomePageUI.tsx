import { useGetMediaPathsAction } from '../../context/AppActionsContext';
import { useUI } from '../../context/UIEnvironmentContext';
import { DonationWidget } from '../donation/DonationWidget';
import { CreateGameForm } from './CreateGameForm';
import { Introduction } from './Introduction';

export const HomePageUI = () => {
  const ui = useUI();
  const { beerMug, beerCan } = useGetMediaPathsAction()();

  return (
    <ui.Row>
      <ui.Flex flex="1" alignItems="center">
        <img src={beerMug} aria-hidden />
      </ui.Flex>
      <ui.PageContainer>
        <Introduction />
        <CreateGameForm />
        <DonationWidget />
      </ui.PageContainer>
      <ui.Flex flex="1" alignItems="center">
        <img src={beerCan} aria-hidden />
      </ui.Flex>
    </ui.Row>
  );
};
