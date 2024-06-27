import { Input, Select } from 'antd';
import CustomCard from '../ui/Card';
import { useSelector } from 'react-redux';
import { getFlaechenId, getKassenzeichen } from '../../store/slices/search';
import TextArea from 'antd/es/input/TextArea';
import { formatDate } from '../../tools/helper';
import { useEffect, useState } from 'react';

export const DetailsRow = ({ title, value, width, customInput }) => {
  return (
    <div className={'flex justify-between gap-2'}>
      <div className="text-sm font-medium w-1/2">{title}:</div>
      <div className={`${width > 365 ? 'w-full' : 'w-1/2'}`}>
        {customInput ? customInput : <Input value={value} size="small" />}
      </div>
    </div>
  );
};

const mockExtractor = (input) => {
  return [];
};

const Details = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const selectedId = useSelector(getFlaechenId);
  const flaechen = extractor(kassenzeichen);
  const [flaeche, setFlaeche] = useState({});

  useEffect(() => {
    if (flaechen) {
      setFlaeche(flaechen.find((value) => value.id === selectedId));
    }
  }, [selectedId]);

  return (
    <CustomCard style={{ ...style, width, height }} title="Allgemein">
      <div className="flex flex-col gap-2 h-full">
        <DetailsRow title="Flächenbezeichnung" value={flaeche?.name} />
        <DetailsRow title="Größe (Grafik)" value={flaeche?.groesseGrafik} />
        <DetailsRow
          title="Größe (Korrektur)"
          value={flaeche?.groesseKorrektor}
        />
        <DetailsRow
          title="Flächenart"
          customInput={
            <Select
              value={flaeche?.flaechenArt}
              className="w-full"
              size="small"
            />
          }
        />
        <DetailsRow
          title="Anschlussgrad"
          customInput={
            <Select
              value={flaeche?.anschlussgradKomplett}
              className="w-full"
              size="small"
            />
          }
        />
        <DetailsRow
          title="Beschreibung"
          customInput={
            <Select
              value={flaeche?.beschreibung}
              className="w-full"
              size="small"
            />
          }
        />
        <DetailsRow title="Anteil" value={flaeche?.anteil} />
        <DetailsRow
          title="Änderungsdatum"
          value={formatDate(flaeche?.datumErfassung)}
        />
        <DetailsRow
          title="Veranlagungsdatum"
          value={flaeche?.datumVeranlagung}
        />
        <DetailsRow
          title="Bemerkung"
          size="small"
          customInput={
            <TextArea className="w-full" value={flaeche?.bemerkung} />
          }
        />
        <DetailsRow
          title="Querverweise"
          size="small"
          customInput={
            <TextArea className="w-full" value={flaeche?.bemerkung} />
          }
        />
      </div>
    </CustomCard>
  );
};

export default Details;
