interface LayerButtonProps {
  title: string;
}

const LayerButton = ({ title }: LayerButtonProps) => {
  return (
    <div className="w-fit flex items-center px-3 bg-white rounded-3xl h-8 z-[99999999] shadow-lg">
      <span className="text-sm font-medium">{title}</span>
    </div>
  );
};

export default LayerButton;
