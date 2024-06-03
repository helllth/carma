import Msg from './InternalMessage';

const SystemMessage = ({ msg }) => {
  return (
    <Msg
      msg={msg}
      alignment="center"
      background="#eee"
      color="#666"
      margin={5}
      padding={5}
      fontSize={0.9}
      width="40%"
    />
  );
};

export default SystemMessage;
