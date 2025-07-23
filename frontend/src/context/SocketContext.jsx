import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import io from "socket.io-client";
import userAtom from "../atoms/userAtom";

const SocketContext = createContext();

export const useSocket = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const user = useRecoilValue(userAtom);


	useEffect(() => {
		const socket = io("/", {
			query: {
				userId: user?._id,
			},
		});
		setSocket(socket);
		window.socket = socket; // Expose globally
		socket.on("getOnlineUsers", (users) => {
			setOnlineUsers(users);
		});
		return () => {
			socket && socket.close();
			window.socket = null;
		};
	}, [user?._id]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
