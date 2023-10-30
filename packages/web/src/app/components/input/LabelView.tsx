export interface LabelViewProps {
  value: any;
  name: string;
}
export function LabelView({ name, value }: LabelViewProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm">{name}</label>
      <label className="text-sm border-b pb-1 pt-2">{value}</label>
    </div>
  );
}
