import { Avatar, Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { useState } from "react";

const Message = ({ ownMessage, message }) => {
	const selectedConversation = useRecoilValue(selectedConversationAtom);
	const user = useRecoilValue(userAtom);
	const [imgLoaded, setImgLoaded] = useState(false);
	const [showModal, setShowModal] = useState(false);

	// Download image handler
	const handleDownload = (imgUrl) => {
		const link = document.createElement('a');
		link.href = imgUrl;
		link.download = 'chat-image.jpg';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	// Image modal
	const ImageModal = ({ imgUrl, onClose }) => (
		<div style={{
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100vw',
			height: '100vh',
			background: 'rgba(0,0,0,0.7)',
			zIndex: 9999,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}} onClick={onClose}>
			<div className="chat-img-modal" onClick={e => e.stopPropagation()}>
				<img src={imgUrl} alt="Full" className="chat-img-modal-img" />
			</div>
		</div>
	);

	return (
		<>
			{showModal && message.img && (
				<ImageModal imgUrl={message.img} onClose={() => setShowModal(false)} />
			)}
			{ownMessage ? (
				<Flex gap={2} alignSelf={"flex-end"}>
					{message.text && (
						<Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
							<Text color={"white"}>{message.text}</Text>
							<Box
								alignSelf={"flex-end"}
								ml={1}
								color={message.seen ? "blue.400" : ""}
								fontWeight={"bold"}
							>
								<BsCheck2All size={16} />
							</Box>
						</Flex>
					)}
					{message.img && (
						<div className="chat-img-card">
							{!imgLoaded && (
								<>
									<Image
										src={message.img}
										hidden
										onLoad={() => setImgLoaded(true)}
										alt='Message image'
										borderRadius={4}
									/>
									<Skeleton w={"200px"} h={"200px"} />
								</>
							)}
							{imgLoaded && (
								<>
									<img
										src={message.img}
										alt="Chat"
										className="chat-img"
										onClick={() => setShowModal(true)}
									/>
									<button className="chat-img-download" onClick={() => handleDownload(message.img)}>
										Download
									</button>
								</>
							)}
						</div>
					)}
					<Avatar src={user.profilePic} w='7' h={7} />
				</Flex>
			) : (
				<Flex gap={2}>
					<Avatar src={selectedConversation.userProfilePic} w='7' h={7} />
					{message.text && (
						<Text maxW={"350px"} bg={"gray.400"} p={1} borderRadius={"md"} color={"black"}>
							{message.text}
						</Text>
					)}
					{message.img && (
						<div className="chat-img-card">
							{!imgLoaded && (
								<>
									<Image
										src={message.img}
										hidden
										onLoad={() => setImgLoaded(true)}
										alt='Message image'
										borderRadius={4}
									/>
									<Skeleton w={"200px"} h={"200px"} />
								</>
							)}
							{imgLoaded && (
								<>
									<img
										src={message.img}
										alt="Chat"
										className="chat-img"
										onClick={() => setShowModal(true)}
									/>
									<button className="chat-img-download" onClick={() => handleDownload(message.img)}>
										Download
									</button>
								</>
							)}
						</div>
					)}
				</Flex>
			)}
		</>
	);
};

export default Message;
