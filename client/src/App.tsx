import { Container, VStack, Text, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Create from "./Create";
import List from "./List";

function App() {
	const [personList, setPersonList] = useState([]);

	useEffect(() => {
		const fetchAll = async () => {
			console.log(`${process.env.REACT_APP_API_BASE}person/all`);
			try {
				let result = await fetch(
					`${process.env.REACT_APP_API_BASE}person/all`,
					{
						headers: {
							Authorization: `${process.env.REACT_APP_API_MASTER_KEY}`,
						},
					}
				);
				console.log(result.json());
			} catch (error) {
				console.log(error);
			}
		};
		fetchAll();
	}, []);

	return (
		<Container maxWidth={"container.xl"} padding={"1%"} centerContent>
			<Text fontSize={35}>Person Manager</Text>
			<Spacer margin={"1%"}></Spacer>
			<VStack spacing={50} width={"100%"}>
				<Create></Create>
				<List></List>
			</VStack>
		</Container>
	);
}

export default App;
