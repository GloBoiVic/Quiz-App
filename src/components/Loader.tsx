import { Loader as Spinner } from 'lucide-react';
export default function Loader() {
  return (
    <div className="w-2/3 flex gap-4 items-center justify-center rounded-lg mx-auto mt-24  md:mt-48 ">
      <span>
        <Spinner />
      </span>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Loading questions...</h4>
    </div>
  );
}
