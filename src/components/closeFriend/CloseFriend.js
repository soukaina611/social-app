import "./closeFriend.css"
import { BASE_URL } from '../../services/helper'

const CloseFriend = ({user}) => {
    return (
      <li className="sidebarFriend">
        <img className="sidebarFriendImg" src={user.profilePicture ? `${BASE_URL}/images/`+user.profilePicture : `${BASE_URL}/images/person/noAvatar.png`} alt="" />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    );
}

export default CloseFriend
