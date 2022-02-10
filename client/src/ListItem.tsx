import {
	Tr,
	Td,
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
	Text,
	HStack,
	VStack,
	Input,
} from "@chakra-ui/react";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";
import IPerson from "./Interfaces";
import { useState } from "react";

function ListItem({
	person,
	deletePerson,
}: {
	person: IPerson;
	deletePerson: Function;
}) {
	const [isOpen, setIsOpen] = useState(false);

	const [firstname, setFirstname] = useState(person.surname);
	const [surname, setSurname] = useState(person.surname);
	const [age, setAge] = useState(person.age);

	return (
		<Tr>
			<Td textAlign={"center"}>
				<Input
					value={firstname}
					onChange={(e) => {
						e.preventDefault();
						setFirstname(e.target.value);
					}}
				></Input>
			</Td>
			<Td textAlign={"center"}>
				<Input
					value={surname}
					onChange={(e) => {
						e.preventDefault();
						setSurname(e.target.value);
					}}
				></Input>
			</Td>
			<Td textAlign={"center"}>
				<Input
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
				<Popover
					isOpen={isOpen}
					onClose={() => {
						setIsOpen(false);
					}}
					closeOnBlur={true}
				>
					<PopoverTrigger>
						<Button
							size={"sm"}
							variant={"outline"}
							onClick={(e) => {
								e.preventDefault();
								setIsOpen(true);
							}}
						>
							<AddIcon></AddIcon>
						</Button>
					</PopoverTrigger>
					<PopoverContent width="inherit">
						<PopoverArrow />
						<PopoverCloseButton />
						<PopoverHeader textAlign={"left"} marginRight={5}>
							Modify Options
						</PopoverHeader>
						<PopoverBody>
							<HStack
								spacing={2}
								justifyContent={"center"}
								alignItems={"center"}
							>
								<VStack spacing={2}>
									<Button
										size={"sm"}
										variant={"outline"}
										onClick={() => {
											deletePerson(person.id);
											setIsOpen(false);
										}}
									>
										<CloseIcon color={"red"}></CloseIcon>
									</Button>
									<Text>Delete</Text>
								</VStack>
							</HStack>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			</Td>
		</Tr>
	);
}

export default ListItem;
