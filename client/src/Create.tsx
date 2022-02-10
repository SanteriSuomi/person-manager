import { Center, Text, Flex, Input, Button, Spacer } from "@chakra-ui/react";

function Create() {
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
					<Input placeholder="Firstname"></Input>
					<Spacer margin={"1%"}></Spacer>
					<Input placeholder="Surname"></Input>
					<Spacer margin={"1%"}></Spacer>
					<Input placeholder="Age"></Input>
				</Flex>
				<Spacer margin={"1%"}></Spacer>
				<Center>
					<Button maxWidth={"90px"}>
						<Text fontSize={20}>Submit</Text>
					</Button>
				</Center>
			</Flex>
		</Flex>
	);
}

export default Create;
