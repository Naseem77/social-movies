import { action, makeObservable, observable } from "mobx";

class UIStore {
	transparentHeader = false;
	modalConfig = {
		active: false,
		isConfirmation: false,
		onConfirm: null,
		body: null,
		freezed: false,
	};

	constructor() {
		makeObservable(this, {
			transparentHeader: observable,
			modalConfig: observable,
			setTransparentHeader: action,
			openModal: action,
			closeModal: action,
			freezeModal: action,
			unFreezeModal: action,
		});
	}

	setTransparentHeader(value) {
		this.transparentHeader = value;
	}

	openModal(modalConfig) {
		this.modalConfig.active = true;
		this.modalConfig.isConfirmation = modalConfig.isConfirmation;
		this.modalConfig.onConfirm = modalConfig.onConfirm;
		this.modalConfig.body = modalConfig.body;
	}

	closeModal() {
		if (this.modalConfig.freezed) {
			return;
		}
		this.modalConfig.active = false;
		this.modalConfig.onConfirm = null;
	}

	freezeModal() {
		this.modalConfig.freezed = true;
	}

	unFreezeModal() {
		this.modalConfig.freezed = false;
	}
}

const uiStore = new UIStore();
export default uiStore;
