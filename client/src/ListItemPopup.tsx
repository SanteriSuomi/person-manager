import {
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
	Spacer,
} from "@chakra-ui/react";
import { CloseIcon, AddIcon, DownloadIcon } from "@chakra-ui/icons";
import IPerson from "./Interfaces";

function ListItemPopup({
	person,
	isOpen,
	setIsOpen,
	deletePerson,
	updatePerson,
	newPerson,
}: {
	person: IPerson;
	isOpen: boolean;
	setIsOpen: Function;
	deletePerson: Function;
	updatePerson: Function;
	newPerson: IPerson;
}) {
	return (
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
						<Spacer margin={1}></Spacer>
						<VStack spacing={2}>
							<Button
								size={"sm"}
								variant={"outline"}
								onClick={() => {
									updatePerson(
										person.id,
										newPerson.firstname,
										newPerson.surname,
										newPerson.age
									);
									setIsOpen(false);
								}}
							>
								<DownloadIcon color={"blue"}></DownloadIcon>
							</Button>
							<Text>Save Changes</Text>
						</VStack>
					</HStack>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
}

export default ListItemPopup;
