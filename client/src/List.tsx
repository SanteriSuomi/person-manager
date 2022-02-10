import {
	Text,
	Flex,
	Spacer,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
} from "@chakra-ui/react";
import IPerson from "./Interfaces";
import ListItem from "./ListItem";

function List({
	personList,
	deletePerson,
	updatePerson,
}: {
	personList: Array<IPerson>;
	deletePerson: Function;
	updatePerson: Function;
}) {
	return (
		<Flex
			flexDirection={"column"}
			justifyContent={"center"}
			alignItems={"center"}
			borderWidth={1}
			borderRadius={20}
			borderColor={"black"}
			padding={"1%"}
			width={["100%", "80%", "70%"]}
			maxWidth={750}
		>
			<Text fontSize={22}>Person List</Text>
			<Spacer margin={"1%"}></Spacer>
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>Firstname</Th>
						<Th>Surname</Th>
						<Th isNumeric>Age</Th>
						<Th isNumeric>Modify</Th>
					</Tr>
				</Thead>
				<Tbody>
					{personList.map((p, index) => (
						<ListItem
							person={p}
							deletePerson={deletePerson}
							updatePerson={updatePerson}
							key={index}
						></ListItem>
					))}
				</Tbody>
			</Table>
		</Flex>
	);
}

export default List;
