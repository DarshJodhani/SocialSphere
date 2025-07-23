import { Avatar, Divider, Flex, Text, Image, Skeleton } from "@chakra-ui/react";
import formatRelativeTime from "../utils/formatRelativeTime";
import { useState } from "react";

const Comment = ({ reply, lastReply }) => {
	const [imgLoaded, setImgLoaded] = useState(false);
	const [showModal, setShowModal] = useState(false);

	// Download image handler
	const handleDownload = (imgUrl) => {
		const link = document.createElement('a');
		link.href = imgUrl;
		link.download = 'reply-image.jpg';
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
			{showModal && reply.img && (
				<ImageModal imgUrl={reply.img} onClose={() => setShowModal(false)} />
			)}
			<Flex gap={4} py={2} my={2} w={"full"}>
				<Avatar src={reply.userProfilePic} size={"sm"} />
				<Flex gap={1} w={"full"} flexDirection={"column"}>
					<Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
						<Text fontSize='sm' fontWeight='bold'>
							{reply.username}
						</Text>
						<Text fontSize='xs' color='gray' ml={2}>
							{reply.createdAt ? formatRelativeTime(reply.createdAt) : ''}
						</Text>
					</Flex>
					<Text>{reply.text}</Text>
					{reply.img && (
						<div className="chat-img-card">
							{!imgLoaded && (
								<>
									<Image
										src={reply.img}
										hidden
										onLoad={() => setImgLoaded(true)}
										alt='Reply image'
										borderRadius={4}
									/>
									<Skeleton w={"200px"} h={"200px"} />
								</>
							)}
							{imgLoaded && (
								<>
									<img
										src={reply.img}
										alt="Reply"
										className="chat-img"
										onClick={() => setShowModal(true)}
									/>
									<button className="chat-img-download" onClick={() => handleDownload(reply.img)}>
										Download
									</button>
								</>
							)}
						</div>
					)}
				</Flex>
			</Flex>
			{!lastReply ? <Divider /> : null}
		</>
	);
};

export default Comment;
