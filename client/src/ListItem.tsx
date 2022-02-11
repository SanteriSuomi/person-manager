import { Tr, Td, Input } from "@chakra-ui/react";

import IPerson from "./Interfaces";
import { useState } from "react";
import ListItemPopup from "./ListItemPopup";

function ListItem({
	person,
	deletePerson,
	updatePerson,
}: {
	person: IPerson;
	deletePerson: Function;
	updatePerson: Function;
}) {
	const [isOpen, setIsOpen] = useState(false);

	const [firstname, setFirstname] = useState(person.firstname);
	const [surname, setSurname] = useState(person.surname);
	const [age, setAge] = useState(person.age);

	return (
		<Tr>
			<Td textAlign={"center"}>
				<Input
					borderWidth={1}
					borderColor={"black"}
					value={firstname}
					onChange={(e) => {
						e.preventDefault();
						setFirstname(e.target.value);
					}}
				></Input>
			</Td>
			<Td textAlign={"center"}>
				<Input
					borderWidth={1}
					borderColor={"black"}
					value={surname}
					onChange={(e) => {
						e.preventDefault();
						setSurname(e.target.value);
					}}
				></Input>
			</Td>
			<Td textAlign={"center"} minWidth={"100"} maxWidth={"130"}>
				<Input
					borderWidth={1}
					borderColor={"black"}
					value={age}
					onChange={(e) => {
						e.preventDefault();
						try {
							let toInt = parseInt(e.target.value);
							if (!isNaN(toInt)) {
								setAge(toInt);
							} else {
								setAge(0);
							}
						} catch (error) {}
					}}
				></Input>
			</Td>
			<Td textAlign={"center"}>
				<ListItemPopup
					person={person}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					deletePerson={deletePerson}
					updatePerson={updatePerson}
					newPerson={{
						id: 0,
						firstname: firstname,
						surname: surname,
						age: age,
					}}
				></ListItemPopup>
			</Td>
		</Tr>
	);
}

export default ListItem;
