import "./closeFriend.css"

const CloseFriend = ({user}) => {
    return (
      <li className="sidebarFriend">
        <img className="sidebarFriendImg" src={user.profilePicture ? "/images/"+user.profilePicture : "/images/person/noAvatar.png"} alt="" />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    );
}

export default CloseFriend
