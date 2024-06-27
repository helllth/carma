import { useNavigate } from 'react-router-dom';
import CustomCard from '../ui/Card';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCrossReferences,
  getKassenzeichen,
  setIsLoading,
} from '../../store/slices/search';

const mockExtractor = (input) => {
  return [
    {
      kassenzeichen: 68119510,
      bez: '1',
    },
    {
      kassenzeichen: 60055167,
      bez: 'A',
    },
    {
      kassenzeichen: 62803044,
      bez: '3',
    },
  ];
};

const CrossReferences = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const data = extractor(dataIn);
  const kassenzeichen = useSelector(getKassenzeichen);
  const crossReferences = useSelector(getCrossReferences);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <CustomCard style={{ ...style, width, height }} title="Querverweise">
      <div className="flex flex-col gap-1 items-center justify-center text-sm">
        {crossReferences?.length > 0 &&
          crossReferences.map((row, i) => {
            const bez = row.flaechenArray[0].flaecheObject.flaechenbezeichnung;

            return (
              <div
                key={`crossReferences_${i}`}
                className="flex w-full justify-center items-center py-1 hover:bg-zinc-100 cursor-pointer"
                onClick={() => {
                  dispatch(setIsLoading(true));
                  navigate(
                    `/versiegelteFlaechen?kassenzeichen=${row.kassenzeichennummer8}&bez=${bez}`
                  );
                }}
                typeof="button"
              >
                <span className="text-black underline">
                  {row.kassenzeichennummer8}:{bez}
                </span>
              </div>
            );
          })}
      </div>
    </CustomCard>
  );
};

export default CrossReferences;
