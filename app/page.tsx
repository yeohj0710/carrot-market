export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5">
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-2 md:flex-row *:outline-none ring ring-transparent transition-shadow has-[:invalid]:ring-red-100">
        <input
          className="w-full rounded-full h-10 bg-gray-200 pl-5 ring ring-transparent focus:ring-green-500 focus:ring-offset-2 transition-shadow invalid:focus:ring-red-500 peer"
          type="email"
          required
          placeholder="이메일 주소 입력"
        />
        <span className="text-red-500 font-medium hidden peer-invalid:block">
          이메일은 필수 입력 사항입니다.
        </span>
        <button className="text-white py-2 min-w-40 rounded-full active:scale-90 focus:scale-90 transition-transform font-medium md:px-10 bg-gradient-to-tr bg-black peer-invalid:bg-red-500">
          로그인
        </button>
      </div>
    </main>
  );
}
