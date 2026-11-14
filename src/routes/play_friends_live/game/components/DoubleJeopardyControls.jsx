import Menu from "./Menu";

const TONES = {
  bust: "text-[#F17E8C]",
  saved: "text-[#FFEA70]",
  continue: "text-[#9BE7A4]",
};

function DieFace({ value, faces }) {
  const size = "w-20 md:w-[45%] max-w-[110px]";
  if (!value) {
    return (
      <div
        className={`${size} aspect-square grid place-content-center rounded-lg border border-[#ffffff40] bg-[#ffffff10] text-white text-3xl`}
      >
        ?
      </div>
    );
  }
  return (
    <img src={faces[value - 1]} alt={`Die showing ${value}`} className={size} />
  );
}

function DoubleJeopardyControls({
  variant,
  faces,
  dice,
  busy,
  finished,
  currentName,
  runningPoints,
  playerCount,
  maxPoints,
  feedback,
  error,
  onRoll,
  onPass,
}) {
  const wrapper =
    variant === "mobile"
      ? "border-r-[#ffffff40] border-r md:hidden flex flex-col items-center justify-around gap-3 px-2 py-3 bg-[#00000010] min-h-[60vh]"
      : "h-screen border-r-[#ffffff40] border-r hidden md:flex flex-col items-center justify-around p-8 sticky top-0 bg-[#00000010]";
  const button =
    "w-full text-white text-center text-base lg:text-xl font-semibold py-2 lg:py-4 rounded-lg border hover:scale-105 active:scale-100 duration-300 disabled:opacity-50 disabled:hover:scale-100";

  return (
    <div className={wrapper}>
      <p className="text-white text-center text-sm lg:text-base">
        {finished
          ? "Game over"
          : `${currentName}'s turn · ${runningPoints} points this turn`}
      </p>

      <div className="flex justify-center gap-2 w-full">
        <DieFace value={dice?.[0]} faces={faces} />
        <DieFace value={dice?.[1]} faces={faces} />
      </div>

      <div
        role="status"
        aria-live="polite"
        className="min-h-[3rem] text-center text-sm lg:text-base px-1"
      >
        {feedback && <p className={TONES[feedback.tone]}>{feedback.text}</p>}
        {error && (
          <p role="alert" className="text-[#F17E8C]">
            {error}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <button
          type="button"
          onClick={onRoll}
          disabled={busy || finished}
          className={`${button} bg-[#D30CBD]`}
        >
          {busy ? "ROLLING..." : "ROLL"}
        </button>
        <button
          type="button"
          onClick={onPass}
          disabled={busy || finished}
          className={`${button} bg-[#056FA4c0]`}
        >
          PASS
        </button>
      </div>

      <Menu />
      <p className="text-white text-center text-sm lg:text-base">
        {playerCount} players · {maxPoints} max points
      </p>
    </div>
  );
}

export default DoubleJeopardyControls;
