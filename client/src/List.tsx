import { ArrowUpDownIcon } from "@chakra-ui/icons";
import {
	Text,
	Flex,
	Spacer,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	HStack,
	IconButton,
} from "@chakra-ui/react";
import IPerson from "./Interfaces";
import ListItem from "./ListItem";
import { SORT_MODE, SORT_METHOD } from "./SortConstants";

function List({
	personList,
	deletePerson,
	updatePerson,
	sortData,
	setSortDataAndSort,
}: {
	personList: Array<IPerson>;
	deletePerson: Function;
	updatePerson: Function;
	sortData: any;
	setSortDataAndSort: Function;
}) {
	const sort = (mode: number) => {
		if (
			sortData.method === SORT_METHOD.DOWN ||
			sortData.method === SORT_METHOD.NONE
		) {
			setSortDataAndSort({
				mode: mode,
				method: SORT_METHOD.UP,
			});
		} else {
			setSortDataAndSort({
				mode: mode,
				method: SORT_METHOD.DOWN,
			});
		}
	};

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
						<Th>
							<HStack>
								<Text>Firstname</Text>
								<IconButton
									width={25}
									height={25}
									aria-label="firstname sort"
									icon={<ArrowUpDownIcon></ArrowUpDownIcon>}
									onClick={() => {
										sort(SORT_MODE.FIRSTNAME);
									}}
								></IconButton>
							</HStack>
						</Th>
						<Th>
							<HStack>
								<Text>Surname</Text>
								<IconButton
									width={25}
									height={25}
									aria-label="surname sort"
									icon={<ArrowUpDownIcon></ArrowUpDownIcon>}
									onClick={() => {
										sort(SORT_MODE.SURNAME);
									}}
								></IconButton>
							</HStack>
						</Th>
						<Th isNumeric>
							<HStack>
								<Text>Age</Text>
								<IconButton
									width={25}
									height={25}
									aria-label="age sort"
									icon={<ArrowUpDownIcon></ArrowUpDownIcon>}
									onClick={() => {
										sort(SORT_MODE.AGE);
									}}
								></IconButton>
							</HStack>
						</Th>
						<Th isNumeric>Modify</Th>
					</Tr>
				</Thead>
				<Tbody>
					{personList.map((p) => (
						<ListItem
							person={p}
							deletePerson={deletePerson}
							updatePerson={updatePerson}
							key={p.id}
						></ListItem>
					))}
				</Tbody>
			</Table>
		</Flex>
	);
}

export default List;
