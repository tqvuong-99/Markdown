const Header: React.FC = () => {
  return (
    <>
      <div className="flex">
        <img className="w-[50px]" src="/logo-black.svg" alt="Logo" />
        <span className="text-4xl font-semibold"> Marked Demo</span>
        <div className=" flex flex-col ml-[48px] underline text-blue-600">
          <a href="https://spec.commonmark.org/dingus/">CommonMark Demo</a>
          <a href="https://daringfireball.net/projects/markdown/dingus">
            Daring Fireball (pedantic) Demo
          </a>
        </div>
      </div>
    </>
  );
};
export default Header;
