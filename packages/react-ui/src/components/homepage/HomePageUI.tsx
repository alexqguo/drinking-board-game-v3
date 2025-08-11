import { useGetMediaPathsAction } from '../../context/AppActionsContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
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
        <ui.Col marginBottom={UISize.xl}>
          <Introduction />
          <CreateGameForm />
          <ui.Row>
            <DonationWidget />
          </ui.Row>
        </ui.Col>
      </ui.PageContainer>

      <ui.Flex flex="1" alignItems="center">
        <img src={beerCan} aria-hidden />
      </ui.Flex>
    </ui.Row>
  );
};
