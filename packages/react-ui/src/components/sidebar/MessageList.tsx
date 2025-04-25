import { useMessages } from '../../context/MessagesContext.jsx';
import { UISize, useUI } from '../../context/UIEnvironmentContext.jsx';

export const MessageList = () => {
  const { messages, isLoading, error } = useMessages();
  const ui = useUI();

  if (isLoading) return <ui.Spinner size={UISize.s} />;
  if (error) return null;

  if (!messages || messages.length === 0) {
    return null;
  }

  return (
    <ui.Col marginTop={UISize.m}>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <ui.Text fontSize={UISize.xs}>{message.msg}</ui.Text>
          </li>
        ))}
      </ul>
    </ui.Col>
  );
};
