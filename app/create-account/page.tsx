import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">
          회원 가입을 위해 아래의 양식을 작성해 주세요.
        </h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          type="email"
          placeholder="이메일 (로그인 시 아이디로 사용)"
          required
          errors={[]}
        />
        <FormInput
          type="password"
          placeholder="비밀번호"
          required
          errors={[]}
        />
        <FormInput
          type="password"
          placeholder="비밀번호 확인"
          required
          errors={[]}
        />
        <FormInput type="text" placeholder="닉네임" required errors={[]} />
        <FormButton loading={false} text="계정 만들기" />
      </form>
      <SocialLogin />
    </div>
  );
}
