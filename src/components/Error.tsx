function Error() {
  return (
    <div className="flex gap-4 items-center justify-center rounded-lg mx-auto mt-24 md:mt-48">
      <p className="scroll-m-20 text-xl font-semibold tracking-tight">
        <span>💥</span> There was an error fetching questions.
      </p>
    </div>
  );
}

export default Error;
