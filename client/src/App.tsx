import {
	Container,
	VStack,
	Text,
	Spacer,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Create from "./Create";
import List from "./List";

function App() {
	const [personList, setPersonList] = useState([]);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const fetchAll = async () => {
		try {
			let result = await fetch(
				`${process.env.REACT_APP_API_BASE}person/all`,
				{
					headers: {
						Authorization: `${process.env.REACT_APP_API_MASTER_KEY}`,
					},
				}
			);
			let data = await result.json();
			setPersonList(data);
		} catch (error) {
			console.log(error);
		}
	};

	const deletePerson = async (id: number) => {
		try {
			let result = await fetch(
				`${process.env.REACT_APP_API_BASE}person/delete?id=${id}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `${process.env.REACT_APP_API_MASTER_KEY}`,
					},
				}
			);
			if (result.ok) {
				await fetchAll();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const createPerson = async (
		firstname: string,
		surname: string,
		age: number
	) => {
		try {
			let result = await fetch(
				`${process.env.REACT_APP_API_BASE}person/new`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${process.env.REACT_APP_API_MASTER_KEY}`,
					},
					body: JSON.stringify({
						firstname: firstname,
						surname: surname,
						age: age,
					}),
				}
			);
			if (result.status === 201) {
				await fetchAll();
			} else if (result.status === 405) {
				onOpen();
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchAll();
	}, []);

	return (
		<Container maxWidth={"container.xl"} padding={"1%"} centerContent>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Error</ModalHeader>
					<ModalCloseButton />
					<ModalBody marginBottom={"5"}>
						<Text>This person likely exists already</Text>
					</ModalBody>
				</ModalContent>
			</Modal>

			<Text fontSize={35}>Person Manager</Text>
			<Spacer margin={"1%"}></Spacer>
			<VStack spacing={50} width={"100%"}>
				<List
					personList={personList}
					deletePerson={deletePerson}
				></List>
				<Create createPerson={createPerson}></Create>
			</VStack>
		</Container>
	);
}

export default App;
