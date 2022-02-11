import {
	VStack,
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Create from "./Create";
import IPerson from "./Interfaces";
import List from "./List";
import { SORT_MODE, SORT_METHOD } from "./SortConstants";

function App() {
	const [personList, setPersonList]: [Array<IPerson>, Function] = useState(
		[]
	);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const [sortData, setSortData] = useState({
		mode: SORT_MODE.NONE,
		method: SORT_METHOD.NONE,
	});

	const setPersonListWithSort = (newPersonList: Array<IPerson>) => {
		switch (sortData.mode) {
			case SORT_MODE.FIRSTNAME:
				compare((a: any, b: any) => {
					return a.firstname.localeCompare(b.firstname);
				});
				break;
			case SORT_MODE.SURNAME:
				compare((a: any, b: any) => {
					return a.surname.localeCompare(b.surname);
				});
				break;
			case SORT_MODE.AGE:
				compare((a: any, b: any) => {
					return a.age - b.age;
				});
				break;
			default:
				break;
		}
		setPersonList(newPersonList);

		function compare(compareFunc: Function) {
			if (sortData.method === SORT_METHOD.UP) {
				newPersonList.sort((a: IPerson, b: IPerson) => {
					return compareFunc(a, b);
				});
			} else {
				newPersonList.sort((a: IPerson, b: IPerson) => {
					return compareFunc(b, a);
				});
			}
		}
	};

	const setSortDataAndSort = (newSortData: any) => {
		setSortData(newSortData);
		setPersonListWithSort(Array.from(personList));
	};

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
			setPersonListWithSort(data);
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
			if (result.status >= 200 && result.status < 300) {
				let data = await result.json();
				setPersonListWithSort(data);
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
			if (result.status >= 200 && result.status < 300) {
				let data = await result.json();
				setPersonListWithSort(data);
			} else if (result.status > 400) {
				onOpen();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const updatePerson = async (
		id: number,
		firstname: string,
		surname: string,
		age: number
	) => {
		try {
			let result = await fetch(
				`${process.env.REACT_APP_API_BASE}person/update?id=${id}`,
				{
					method: "PUT",
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
			if (result.status >= 200 && result.status < 300) {
				let data = await result.json();
				setPersonListWithSort(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchAll();
	}, []);

	return (
		<Center padding={["0%", "1%", "1%"]}>
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

			<VStack spacing={50} width={"100%"}>
				<Text fontSize={35}>Person Manager</Text>
				<List
					personList={personList}
					deletePerson={deletePerson}
					updatePerson={updatePerson}
					sortData={sortData}
					setSortDataAndSort={setSortDataAndSort}
				></List>
				<Create createPerson={createPerson}></Create>
			</VStack>
		</Center>
	);
}

export default App;
