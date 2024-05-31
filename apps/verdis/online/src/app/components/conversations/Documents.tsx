import { useEffect, useState } from 'react';

const Documents = ({
  fileObject,
  remove,
  background = '#eeeeee',
  addComma,
}) => {
  const [verifiedState, setVerifiedState] = useState('unverified');
  useEffect(() => {}, []);
  return <div>Documents</div>;
};

export default Documents;
