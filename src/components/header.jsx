import ProfileImage from "../UI/profileImage";

const Header = () => {
  return (
    <div
      className="container-fluid border border-2 border-danger mt-5 d-flex align-items-center justify-content-between px-5 libertinus-math-regular"
      style={{
        height: "250px",
        borderRadius: "15px",
        fontSize: "18px",
        boxShadow: "5px -10px 5px gray"
      }}
    >
      {/* Name and Email Section */}
      <div>
        <h2 className="mb-2">Bhoj GC</h2>

        <p className="mb-0">ghartich@gmail.com</p>
      </div>

      {/* Profile Image Section */}
      <ProfileImage />
    </div>
  );
};

export default Header;
