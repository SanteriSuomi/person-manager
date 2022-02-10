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
}: {
	personList: Array<IPerson>;
	deletePerson: Function;
}) {
	return (
		<Flex
			flexDirection={"column"}
			justifyContent={"center"}
			alignItems={"center"}
			width={["95%", "70%", "55%"]}
			borderWidth={1}
			borderRadius={20}
			borderColor={"black"}
			padding={"2%"}
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
							key={index}
						></ListItem>
					))}
				</Tbody>
			</Table>
		</Flex>
	);
}

export default List;
