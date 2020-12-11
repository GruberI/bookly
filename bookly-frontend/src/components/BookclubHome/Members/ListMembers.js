import React from 'react';
import './ListMembers.css'

const MembersList = (props) => {


   
    return(
        <div className="member-ul-container">
            <ul className="members-ul">
                {props && props.members ? props.members.map((member) => {
                return (
                    <div className="member-li">
                    <li key={member._id}><em className="members-em">{member.username}</em><p onClick={()=>props.remove(member)} className="members-p">(Leave)</p></li>
                    </div>
                )
                }) : ""}
            </ul>
        </div>
    );
}

export default MembersList;