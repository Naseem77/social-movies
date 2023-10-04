import Divider from "../Divider";
import * as Styles from "./DividedListStyles";

function DividedList(props) {
	const { resultsList, title, buildComponent } = props;

	if (resultsList.length === 0) {
		return null;
	}

	return (
		<Styles.Root expand>
			<h1 className="h5">{title}</h1>
			{resultsList.map((result, index) => (
				<div key={result.id}>
					{buildComponent(result)}
					{resultsList.length - index > 1 && <Divider />}
				</div>
			))}
		</Styles.Root>
	);
}

export default DividedList;
