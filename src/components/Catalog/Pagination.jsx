const Pagination = () => {
  return (
    <nav
      className="flex gap-3 justify-between items-center self-center mt-6 max-w-full text-sm font-semibold text-center text-gray-400 whitespace-nowrap w-[316px]"
      aria-label="Pagination"
    >
      <button
        className="gap-2.5 self-stretch px-4 pt-2 pb-8 text-lg border-2 border-solid border-[color:var(--Color---5,#A2A6B0)] h-[38px] rounded-[50px] w-[38px]"
        aria-label="Previous page"
      >
        ‹
      </button>
      <button className="gap-2.5 self-start px-4 py-2 border-2 border-solid border-[color:var(--Color---5,#A2A6B0)] h-[37px] rounded-[50px] w-[37px]">
        1
      </button>
      <button
        className="gap-2.5 self-stretch px-4 py-2 text-black bg-violet-50 h-[38px] rounded-[50px] w-[38px]"
        aria-current="page"
      >
        2
      </button>
      <button className="gap-2.5 self-start px-4 py-2 border-2 border-solid border-[color:var(--Color---5,#A2A6B0)] rounded-[50px]">
        3
      </button>
      <span className="my-auto text-sm leading-7">...</span>
      <button className="gap-2.5 self-start px-4 py-2 border-2 border-solid border-[color:var(--Color---5,#A2A6B0)] rounded-[50px]">
        15
      </button>
      <button
        className="gap-2.5 self-stretch px-4 py-2 text-lg border-2 border-solid border-[color:var(--Color---5,#A2A6B0)] h-[38px] rounded-[50px] w-[38px]"
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
};

export default Pagination;
