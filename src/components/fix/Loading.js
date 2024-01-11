import React from "react";
import { MoonLoader } from "react-spinners";

const override = {
    display: "flex",
    margin: "0 auto",
    borderColor: "#E50915",
    textAlign: "center"
  };

const Loading = () => {

    return (
        <>
         <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", maxHeight: "100vh" }}>
            <MoonLoader
                color="#2A8757"
                cssOverride={override}
                size={120}
                speedMultiplier={1}
            />
</div>


        </>
    );
};

export default Loading;