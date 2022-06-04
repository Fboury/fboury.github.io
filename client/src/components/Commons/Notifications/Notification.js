import React, { useState, useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { commonConstants } from "../../../constants/commonConstants";

export function Notification({ notifications }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (notifications.length) {
      setShow(true);
    }
  }, [notifications]);

  return (
    <div className="Notification">
      {notifications.length ? (
        notifications.map((notification, index) => (
          <div className="position-relative" key={index}>
            <ToastContainer className="p-3" position="top-left">
              <Toast
                bg={commonConstants.TYPE_STATUS[notification.status].bg}
                onClose={() => setShow(false)}
                show={show}
                autohide
                delay={4000}
              >
                <Toast.Header>
                  {commonConstants.TYPE_STATUS[notification.status].title}
                </Toast.Header>
                <Toast.Body className="text-white">
                  {notification.libelleNotification}
                </Toast.Body>
              </Toast>
            </ToastContainer>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default Notification;
