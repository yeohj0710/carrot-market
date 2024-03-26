export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5">
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-4">
        <div className="group flex flex-col">
          <input
            className="bg-gray-100 w-full"
            placeholder="이메일을 입력하세요"
          />
          <span className="group-focus-within:block hidden">
            올바른 이메일 형식이 아닙니다.
          </span>
          <button>입력</button>
        </div>
      </div>
    </main>
  );
}
