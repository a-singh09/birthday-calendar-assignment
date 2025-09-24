"use client";
import React from "react";

function page() {
  return (
    <>
      <div className="container">
        <div className="spiral"></div>
      </div>

      <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;
          background: #f5d6b4;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        .spiral {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            #d86f45 0deg 90deg,
            #f5d6b4 90deg 180deg,
            #d86f45 180deg 270deg,
            #f5d6b4 270deg 360deg
          );
          position: relative;
        }

        .spiral::before {
          content: "";
          position: absolute;
          top: 25px;
          left: 25px;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: conic-gradient(
            from 45deg,
            #f5d6b4 0deg 90deg,
            #d86f45 90deg 180deg,
            #f5d6b4 180deg 270deg,
            #d86f45 270deg 360deg
          );
        }

        .spiral::after {
          content: "";
          position: absolute;
          top: 50px;
          left: 50px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: conic-gradient(
            from 90deg,
            #d86f45 0deg 90deg,
            #f5d6b4 90deg 180deg,
            #d86f45 180deg 270deg,
            #f5d6b4 270deg 360deg
          );
        }

        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
}

export default page;
