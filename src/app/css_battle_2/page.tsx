"use client";
import React from "react";

function page() {
  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
        }

        .container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #f4dcbf;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .flower {
          position: relative;
          width: 150px;
          height: 150px;
        }

        .petal {
          position: absolute;
          width: 100px;
          height: 100px;
          background: #d95362;
        }

        .top-petal {
          border-radius: 50px 50px 0 0;
          top: -25px;
          left: 25px;
        }

        .right-petal {
          border-radius: 0 50px 50px 0;
          top: 25px;
          left: 75px;
        }

        .bottom-petal {
          border-radius: 0 0 50px 50px;
          top: 75px;
          left: 25px;
        }

        .left-petal {
          border-radius: 50px 0 0 50px;
          top: 25px;
          left: -25px;
        }

        .center-circle {
          position: absolute;
          width: 50px;
          height: 50px;
          background: #d95362;
          border-radius: 50%;
          top: 50px;
          left: 50px;
        }
      `}</style>

      <div className="container">
        <div className="flower">
          {/* Top petal */}
          <div className="petal top-petal" />

          {/* Right petal */}
          <div className="petal right-petal" />

          {/* Bottom petal */}
          <div className="petal bottom-petal" />

          {/* Left petal */}
          <div className="petal left-petal" />

          {/* Center circle */}
          <div className="center-circle" />
        </div>
      </div>
    </>
  );
}

export default page;
