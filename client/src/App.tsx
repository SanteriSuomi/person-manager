import { Container, VStack, Text, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Create from "./Create";
import List from "./List";

function App() {
	const [personList, setPersonList] = useState([]);

	useEffect(() => {
		const fetchAll = async () => {
			try {
				let result = await fetch(
					`${process.env.REACT_APP_API_BASE}person/all`,
					{
						headers: {
							Authorization: `${process.env.REACT_APP_API_MASTER_KEY}`,
						},
					}
				);
				let data = await result.json();
				setPersonList(data);
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
				<List personList={personList}></List>
				<Create></Create>
			</VStack>
		</Container>
	);
}

export default App;
