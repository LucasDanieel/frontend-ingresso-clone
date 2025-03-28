const IconArrowDownGradient = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 15 15">
    <defs>
      <linearGradient id="chevron-gradient">
        <stop offset="0%" stopColor="#ffce00" />
        <stop offset="100%" stopColor="#ff8000" />
      </linearGradient>
    </defs>
    <path
      fill="url(#chevron-gradient)"
      stroke="url(#chevron-gradient)"
      fillRule="evenodd"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
    />
  </svg>
);

export default IconArrowDownGradient;
