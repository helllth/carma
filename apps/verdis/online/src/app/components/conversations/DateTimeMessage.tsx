import Msg from './InternalMessage';
const DateTimeMessage = ({ msg }) => {
  return (
    <Msg
      msg={msg}
      alignment="center"
      background="#F8F8F8"
      color="#666"
      margin={5}
      padding={5}
      fontSize={0.9}
      width="fit-content"
    />
  );
};

export default DateTimeMessage;
