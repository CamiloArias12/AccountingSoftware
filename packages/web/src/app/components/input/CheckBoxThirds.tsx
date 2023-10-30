type CheckBoxThirdsProps = {
  isChecked: boolean;
  onChange: any;
  name?: string;
};

function CheckBoxThirds({ isChecked, onChange, name }: CheckBoxThirdsProps) {
  return (
    <>
      <div className="flex flex-row items-center text-input pl-4">
        <div
          className={`h-4 w-4  rounded-[50%] border border-[#10417B] ${
            isChecked ? 'bg-[#10417B]' : 'bg-white'
          }`}
          onClick={onChange}
        />
        <label htmlFor={name} className="pl-3 text-input">
          {name}
        </label>
      </div>
    </>
  );
}

export default CheckBoxThirds;
