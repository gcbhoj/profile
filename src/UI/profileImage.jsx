const ProfileImage = () => {
  return (
    <div className="profile-image">
      <img
        src="/profile.jpg"
        alt="Profile"
        className="rounded-circle"
        style={{
          width: "180px",
          height: "220px",
          objectFit: "cover",
          boxShadow: "5px 5px 5px gray",
        }}
      />
    </div>
  );
};

export default ProfileImage;
