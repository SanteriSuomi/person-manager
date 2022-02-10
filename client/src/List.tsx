import {
	Text,
	Flex,
	Spacer,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
} from "@chakra-ui/react";

function List() {
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
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>Santeri</Td>
						<Td>Suomi</Td>
						<Td isNumeric>23</Td>
					</Tr>
				</Tbody>
			</Table>
		</Flex>
	);
}

export default List;
