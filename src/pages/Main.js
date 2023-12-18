import React from 'react';
import '../styles/Main.css';
import { useSelector } from 'react-redux';

const Main = () => {

    const loginUser = useSelector((state) => state.loginUser);
    console.log("Main loginUser", loginUser);

    return (
        <>
            {/* ***** Welcome Area Start ***** */}
            <div className="welcome-area" id="welcome">

                {/*  ***** Header Text Start ***** */}
                <div className="header-text">
                    <div className="container">
                        <div className="row">
                            
                        </div>
                    </div>
                </div>
                {/* < ***** /Header Text End *****  */}
            </div>
            {/* ***** Welcome Area End *****  */}
        </>

    );
}

export default Main;
