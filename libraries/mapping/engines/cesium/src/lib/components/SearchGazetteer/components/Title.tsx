import { FC } from "react";
import { NAMED_CATEGORIES } from '@carma-mapping/fuzzy-search';

interface TitleProps {
  category: string;
}

const Title: FC<TitleProps> = ({ category }) => {
  const title = NAMED_CATEGORIES[category] || category;
  return <span>{title as string}</span>;
};

export default Title;
