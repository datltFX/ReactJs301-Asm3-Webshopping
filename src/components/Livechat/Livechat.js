import "./Livechat.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

const Livechat = () => {
  const [showChat, setShowChat] = useState(false);
  const toggle = () => {
    setShowChat(!showChat);
  };
  return (
    <div>
      {showChat && (
        <div className="contanerLivechat">
          <div className="livechat_title">
            <h5>Customer Support</h5>
            <div className="">let's Chat App</div>
          </div>
          <div className="livechat_content">
            <div className="livechat_content_right1">xin chào</div>
            <div className="livechat_content_right2">
              làm thế nào để xem các sản phẩm
            </div>
            <div className="livechat_content_admin">
              <div>
                <i className="livechat_content_admin_icon">👩🏻‍💼</i>
                <div className="livechat_content_left1_admin">
                  ADMIN: chào bạn
                </div>
              </div>
              <div>
                <i className="livechat_content_admin_icon">👩🏻‍💼</i>
                <div className="livechat_content_left2_admin">
                  ADMIN: bạn có thể vào mục Shop để xem các sản phẩm
                </div>
              </div>
            </div>
          </div>
          <div className="livechat_content_messager">
            <i className="livechat_content_admin_icon">👩🏻‍💼</i>
            <input
              type="text"
              placeholder="Enter Message!"
              className="livechat_content_input"
            />
            <FontAwesomeIcon icon={faPaperclip} />
            <i className="livechat_content_messager">🙂🚀</i>
          </div>
        </div>
      )}
      {/* -------nut an hien Livechat------ */}
      <button className="livechat_content_button" onClick={toggle}>
        💬
      </button>
    </div>
  );
};

export default Livechat;
