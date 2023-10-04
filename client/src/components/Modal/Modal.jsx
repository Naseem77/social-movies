import { useEffect } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { inject, observer } from "mobx-react";

import * as Styles from "./ModalStyles";
import Button from "../Button/Button";
import Loading from "../Loading";

function Modal(props) {
	const { UIStore } = props;
	const { active, isConfirmation, onConfirm, body } = UIStore.modalConfig;
	const [loading, setLoading] = useState(false);
	const targetElement = document.querySelector("#modal");

	useEffect(() => {
		if (active) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [active]);

	async function submit(e) {
		if (typeof e.preventDefault === "function") {
			e.preventDefault();
		}
		if (isConfirmation && onConfirm) {
			setLoading(true);
			await onConfirm();
			setLoading(false);
		}
	}

	function closeModel() {
		UIStore.closeModal();
	}

	function RootOnClick(e) {
		if (e.target.dataset.modalContainer) {
			closeModel();
		}
	}

	return createPortal(
		<Styles.Root data-modal-container active={active} onClick={RootOnClick}>
			<Styles.Modal
				active={active}
				as="form"
				noValidate
				onSubmit={submit}
			>
				<Styles.ModalHeader>
					<Styles.CloseBtn className="clickable" onClick={closeModel}>
						<span className="material-icons-round">close</span>
					</Styles.CloseBtn>
				</Styles.ModalHeader>

				<Styles.ModalBody>{body}</Styles.ModalBody>

				{isConfirmation && (
					<Styles.ModalFooter>
						<Button secondary onClick={closeModel} type="reset">
							Cancel
						</Button>
						{loading ? <Loading med /> : <Button>Confirm</Button>}
					</Styles.ModalFooter>
				)}
			</Styles.Modal>
		</Styles.Root>,
		targetElement
	);
}

export default inject("UIStore")(observer(Modal));
