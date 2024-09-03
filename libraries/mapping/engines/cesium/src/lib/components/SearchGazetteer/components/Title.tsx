import { FC } from "react";
import { titleMap } from "../utils";

interface TitleProps {
  category: string;
}

const Title: FC<TitleProps> = ({ category }) => {
  const title = titleMap.get(category) || category;
  return <span>{title}</span>;
};

export default Title;
