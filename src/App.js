import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Modal from "react-modal";
import "./App.css"

Modal.setAppElement("#root");

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contentName, setContentName] = useState("");
  const [contentDesc, setContentDesc] = useState("");
  const [contentDuration, setContentDuration] = useState("");

  useEffect(() => {
    const getWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
        } catch (error) {
          console.error(error);
        }
      }
    };
    getWeb3();
  }, []);

  useEffect(() => {
    const getAccounts = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
      }
    };
    getAccounts();
  }, [web3]);

  const connectWallet = async () => {
    if (!web3) {
      console.error("Web3 is not initialized.");
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
    } catch (error) {
      console.error(error);
    }
  };

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(contentName, contentDesc, contentDuration);
    closeModal();
  }

  return (
    <div>
      {accounts.length > 0 ? (
        <p>Connected with account: {accounts[0]}</p>
      ) : (
        <button onClick={connectWallet}>Connect Metamask</button>
      )}
      <button onClick={openModal}>Post</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Content Modal"
      >
        <h2>Add Content</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Content Name:
            <br/>
            <input
              type="text"
              value={contentName}
              onChange={(e) => setContentName(e.target.value)}
            />
            <br/>
          </label>
          <label>
            Content Description:
            <br/>
            <textarea
              value={contentDesc}
              onChange={(e) => setContentDesc(e.target.value)}
            />
          </label>
          <br/>
          <label>
            Duration:
            <br/>
            <input
              type="text"
              value={contentDuration}
              onChange={(e) => setContentDuration(e.target.value)}
            />
            <br/>
          </label>
          <button type="submit">Submit</button>
        </form>
        <button style={{position: "absolute", top:  "10px", right: "10px", cursor: "pointer"}} onClick={closeModal}>
            X
        </button>
      </Modal>
    </div>
  );
}

export default App;