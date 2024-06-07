import { Tabs } from 'antd';
import { parseDescription } from '../../helper/helper';
import { tabItems } from './items';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveTabKey, setActiveTabKey } from '../../store/slices/ui';

interface InfoProps {
  description: string;
  legend: any;
}

const Info = ({ description, legend }: InfoProps) => {
  const dispatch = useDispatch();
  const activeTabKey = useSelector(getActiveTabKey);
  const parsedDescription = parseDescription(description);

  return (
    <>
      <h4 className="font-semibold">Informationen</h4>
      {parsedDescription && (
        <div>
          <h5 className="font-semibold">Inhalt</h5>
          <p className="text-sm">{parsedDescription.inhalt}</p>
          <h5 className="font-semibold">Sichtbarkeit</h5>
          <p className="text-sm">
            {parsedDescription.sichtbarkeit.slice(0, -1)}
          </p>
          <h5 className="font-semibold">Nutzung</h5>
          <p className="text-sm">{parsedDescription.nutzung}</p>
        </div>
      )}
      <hr className="h-px my-0 bg-gray-300 border-0 w-full" />
      <Tabs
        animated={false}
        items={tabItems(legend)}
        activeKey={activeTabKey}
        onChange={(key) => dispatch(setActiveTabKey(key))}
      />
    </>
  );
};

export default Info;
