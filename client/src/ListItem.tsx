import { Tr, Td } from "@chakra-ui/react";
import IPerson from "./Interfaces";

function ListItem({ person }: { person: IPerson }) {
	return (
		<Tr>
			<Td>{person.firstname}</Td>
			<Td>{person.surname}</Td>
			<Td textAlign={"right"}>{person.age}</Td>
		</Tr>
	);
}

export default ListItem;
