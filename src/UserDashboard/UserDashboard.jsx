import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import Employee from "../assets/images/emp.gif";
import "../style/userDashboard.css";
import { GetRewardPoints } from "../Web3/contractFunction";
import { orange } from "@mui/material/colors";
const BigNumber = require("bignumber.js");

const UserDashboard = () => {
  const [formdata, setFormData] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const getAddress = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    console.log("getAddress", addr);
    setWalletAddress(addr);
  };
  const PointFetch = async () => {
    console.log("wallet address after address function", walletAddress);
    const value = await GetRewardPoints(walletAddress);
    console.log("totalpoint value", value);
    const bigValue = new BigNumber(value._hex);
    setFormData(bigValue);
  };
  useEffect(() => {
    const fetch = async () => {
      await getAddress();
    };

    fetch();
  }, []);

  useEffect(() => {
    if (walletAddress) {
      PointFetch();
    }
  }, [walletAddress]);

  console.log("points", formdata);
  return (
    <>
      <div className="container1">
        <h2 className="title">
          <span className="title-word title-word-1">Welcome</span>

          <span className="title-word title-word-2 p-3">to</span>
          <br />
          <span className="title-word title-word-3 m-2">Employee</span>

          <span className="title-word title-word-4 m-2">Management</span>

          <span className="title-word title-word-5 m-2">System</span>
        </h2>
        <div className="mainreward">
          <div className="Employee-img1">
            <img src={Employee} alt={Employee} />
          </div>
          <div className="reward1">
            <div className="reward2">
              <div className="reward3"> {formdata.toString()} </div>
            </div>
            <label htmlFor="" style={{ width: "30%", margin: "0%" }}>
              {" "}
              Total Reward Points
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
