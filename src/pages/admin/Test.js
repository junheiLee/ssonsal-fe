import React from 'react';
import LeftPanel from './adminScript/LeftPanel';
import Header from './adminScript/AdminHeader';
import AdminFooter from './adminScript/AdminFooter';
import Message from './Message';
import MessageCancle from './MessageCancle';
import Email from './EmailSubscriptionButton';
import EmailCancle from './EmailUnsubscribeButton';


const Test = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

     

        <div style={{ flex: 1, padding: '20px', marginBottom: '10px' }}>
          <Message />
        </div>

        <div style={{ flex: 1, padding: '20px', marginBottom: '10px' }}>
          <MessageCancle />
        </div>

        <div style={{ flex: 1, padding: '20px', marginBottom: '10px' }}>
          <Email />
        </div>

        <div style={{ flex: 1, padding: '20px', marginBottom: '10px' }}>
          <EmailCancle />
        </div>
      
      <AdminFooter />
    </div>
  );
};

export default Test;