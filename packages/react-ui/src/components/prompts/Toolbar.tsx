import { Dispatch, FC, SetStateAction } from 'react';
import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { useScreenSize } from '../../hooks/useScreenSize';

interface Props {
  showMap: boolean;
  setShowMap: Dispatch<SetStateAction<boolean>>;
}

const baseStyling: React.CSSProperties = {
  position: 'absolute',
  zIndex: 9999,
  pointerEvents: 'auto',
};

const getStyling = (size: 's' | 'l') => ({
  ...baseStyling,
  ...(size === 's'
    ? {
        bottom: 0,
        left: 0,
      }
    : {
        top: 0,
        right: 0,
      }),
});

export const Toolbar: FC<Props> = ({ showMap, setShowMap }) => {
  const ui = useUI();
  const { getMessage } = useI18n();
  const { screenSize } = useScreenSize();

  return (
    <div style={getStyling(screenSize)}>
      <ui.Row padding={UISize.l}>
        <ui.Button variant="secondary" onClick={() => setShowMap((prev) => !prev)} size={UISize.xs}>
          {getMessage(showMap ? 'webapp_showPrompt' : 'webapp_showMap')}
        </ui.Button>
      </ui.Row>
    </div>
  );
};
