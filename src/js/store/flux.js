const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			newContact: []
		},

		actions: {
			getAgenda: async () => {
				try {
					const response = await fetch("https://assets.breatheco.de/apis/fake/contact/agenda/yun-joung", {
						method: "GET",
						headers: { "Content-Type": "application/json" }
					});
					const json = await response.json();
					setStore({
						newContact: json
					});
				} catch (error) {
					console.log(error);
				}
			},

			createContact: async (e, fullName, email, phone, address) => {
				e.preventDefault();
				try {
					const response = await fetch("https://assets.breatheco.de/apis/fake/contact/", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							agenda_slug: "yun-joung",
							full_name: `${fullName}`,
							email: `${email}`,
							address: `${address}`,
							phone: `${phone}`
						})
					});
					const json = await response.json();
					console.log(json);
					setStore({ newContact: JSON.stringify(json) });
					getActions().getAgenda();
				} catch (error) {
					console.log(error);
				}
			},

			editContactInfo: async (e, id, fullName, email, phone, address) => {
				e.preventDefault();
				try {
					const response = await fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							agenda_slug: "yun-joung",
							full_name: `${fullName}`,
							email: `${email}`,
							address: `${address}`,
							phone: `${phone}`
						})
					});
					const json = await response.json();
					console.log(json);
					setStore({ newContact: JSON.stringify(json) });
					getActions().getAgenda();
				} catch (error) {
					console.log(error);
				}
			},

			eliminaContact: async id => {
				console.log(id);
				const store = getStore();
				const newList = store.newContact.filter(item => item.id !== id);
				setStore({
					newContact: newList
				});
				try {
					const response = await fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
						method: "DELETE",
						headers: { "Content-Type": "application/json" }
					});
					const json = await response.json();
					console.log(json);
				} catch (error) {
					console.log(error);
				}
			},

			getContact: async id => {
				try {
					const response = await fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
						method: "GET",
						headers: { "Content-Type": "application/json" }
					});
					const json = await response.json();
					console.log(json);
					return json;
				} catch (error) {
					console.log(error);
				}
			}
		}
	};
};
export default getState;
