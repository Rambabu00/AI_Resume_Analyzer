interface Props {
  role: "user" | "ai";
  children: React.ReactNode;
}

const MessageBubble = ({ role, children }: Props) => {
  return (
    <div className={`message-row ${role}`}>
      <div className={`message-bubble ${role}`}>
        {children}
      </div>
    </div>
  );
};

export default MessageBubble;
