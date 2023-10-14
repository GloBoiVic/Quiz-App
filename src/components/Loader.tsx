import { Loader as Spinner } from 'lucide-react';

export default function Loader() {
  return (
    <div className="flex items-center justify-center w-2/3 gap-4 mx-auto mt-24 rounded-lg md:mt-48 ">
      <span>
        <Spinner />
      </span>
      <h4 className="text-xl font-semibold tracking-tight scroll-m-20">Loading questions...</h4>
    </div>
  );
}
