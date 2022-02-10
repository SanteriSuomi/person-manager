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
} from "@chakra-ui/react";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";
import IPerson from "./Interfaces";

function ListItem({
	person,
	deletePerson,
}: {
	person: IPerson;
	deletePerson: Function;
}) {
	return (
		<Tr>
			<Td>{person.firstname}</Td>
			<Td>{person.surname}</Td>
			<Td textAlign={"right"}>{person.age}</Td>
			<Td textAlign={"right"}>
				<Popover>
					<PopoverTrigger>
						<Button size={"sm"} variant={"outline"}>
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
