import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient.js";

const getLocalStorage = () => {
  const key = localStorage.getItem("key");
  if (key) {
    return true;
  }
  return false;
};

const AuthContext = React.createContext();

export function AuthProvides({ children }) {
  const [isAccessCode, setIsAccessCode] = useState(false);
  const [message, setMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(getLocalStorage());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(100);
  const [totalUsers, setTotalUsers] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState([]);

  async function createNewAccessCode(phoneNumber) {
    try {
      const results = await axiosClient.post(
        "login",
        JSON.stringify({ number: phoneNumber })
      );
      if (results.otpCreated) {
        setIsAccessCode(true);
        setMessage(`Your access code is ${results.AccessCode}`);
      }
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong, cannot sent OTP");
    }
  }

  async function validateAccessCode(Number, Otp) {
    try {
      const request = JSON.stringify({ accessCode: Otp });
      const results = await axiosClient.post(`login/${Number}`, request);
      if (results.status === 200) {
        localStorage.setItem("key", Number);
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function likeGithubUser(req) {
    try {
      const userNumber = localStorage.getItem("key");
      const request = JSON.stringify({ likedUser: req });
      const results = await axiosClient.post(`/user/${userNumber}`, request);
      getUserProfile();
    } catch (err) {
      console.log(err);
    }
  }

  async function getUserProfile() {
    try {
      const userNumber = localStorage.getItem("key");
      const results = await axiosClient.get(`/user/${userNumber}`);
      setUserProfile(results.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getGithubUsers() {
    try {
      setIsLoading(true);
      const results = await axios.get("https://api.github.com/search/users", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          q: searchTerm,
          per_page: usersPerPage,
          page: currentPage,
        },
      });
      setData(results.data);
      setTotalUsers(() => {
        if (results.data.total_count > 1000) {
          return 1000;
        } else {
          return results.data.total_count;
        }
      });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }

  // fetching github users
  useEffect(() => {
    if (searchTerm) {
      getGithubUsers();
    }
    return;
  }, [searchTerm, currentPage, usersPerPage]);

  useEffect(() => {
    getUserProfile();
  }, [data]);

  // paginate
  const paginate = (p) => {
    setCurrentPage(p);
  };

  const value = {
    isLoggedIn,
    message,
    isAccessCode,
    data,
    isLoading,
    totalUsers,
    usersPerPage,
    setUsersPerPage,
    currentPage,
    paginate,
    userProfile,
    getUserProfile,
    createNewAccessCode,
    validateAccessCode,
    setSearchTerm,
    getGithubUsers,
    likeGithubUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
