import React, { useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
//import InputEmoji from "react-input-emoji";

const SendInput = () => {
  const [message, setMessage] = useState("");
  //const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(setMessages([...messages, res?.data?.newMessage]));
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  };
  // const handleChange = (newMessage)=>{
  //   setNewMessage(newMessage)
  // }
  return (
    <form onSubmit={onSubmitHandler} className="px-4 my-3">
      <div className="w-full relative">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="send a message..."
          className="border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-500 text-white "
        />
        {/* <InputEmoji
          value={message}
          onChange={setMessage}
          /> */}
        <button
          type="submit"
          className="absolute flex inset-y-0 end-0 items-center pr-3"
        >
          <RiSendPlane2Fill />
        </button>
      
        
      </div>
    </form>
  );
};

export default SendInput;
