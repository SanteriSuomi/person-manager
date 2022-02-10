import { Center, Text, Flex, Input, Button, Spacer } from "@chakra-ui/react";
import { useState } from "react";

function Create({ createPerson }: { createPerson: Function }) {
	const [firstname, setFirstname] = useState("");
	const [surname, setSurname] = useState("");
	const [age, setAge] = useState("");

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
			<Text fontSize={22}>Create Person</Text>
			<Spacer margin={"1%"}></Spacer>
			<Flex flexDirection={"column"} maxWidth={"95%"}>
				<Flex flexDirection={"row"}>
					<Input
						placeholder="Firstname"
						onChange={(e) => {
							e.preventDefault();
							setFirstname(e.target.value);
						}}
					></Input>
					<Spacer margin={"1%"}></Spacer>
					<Input
						placeholder="Surname"
						onChange={(e) => {
							e.preventDefault();
							setSurname(e.target.value);
						}}
					></Input>
					<Spacer margin={"1%"}></Spacer>
					<Input
						placeholder="Age"
						onChange={(e) => {
							e.preventDefault();
							setAge(e.target.value);
						}}
					></Input>
				</Flex>
				<Spacer margin={"1%"}></Spacer>
				<Center>
					<Button
						maxWidth={"90px"}
						onClick={(e) => {
							e.preventDefault();
							createPerson(firstname, surname, age);
						}}
					>
						<Text fontSize={20}>Submit</Text>
					</Button>
				</Center>
			</Flex>
		</Flex>
	);
}

export default Create;
