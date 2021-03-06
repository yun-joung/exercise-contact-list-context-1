import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const AddContact = props => {
	const { store, actions } = useContext(Context);
	const { id } = props.match.params;

	useEffect(() => {
		if (id !== undefined) {
			actions.getContact(id).then(item => {
				setFullName(item.full_name);
				setEmail(item.email);
				setPhone(item.phone);
				setAddress(item.address);
				console.log(item);
			});
		}
	}, []);

	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

	const item = store.newContact;

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">
					{id !== undefined ? "Edit your contact info" : "Add a new contact"}
				</h1>
				<form
					onSubmit={e => {
						if (id !== undefined) actions.editContactInfo(e, id, fullName, email, phone, address);
						else actions.createContact(e, fullName, email, phone, address);
					}}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							onChange={e => setFullName(e.target.value)}
							defaultValue={fullName}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							onChange={e => setEmail(e.target.value)}
							defaultValue={email}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							onChange={e => setPhone(e.target.value)}
							defaultValue={phone}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							onChange={e => setAddress(e.target.value)}
							defaultValue={address}
						/>
					</div>
					{id !== undefined ? (
						//<Link className="mt-3 w-100 text-center" to="/">
						<button type="submit" className="btn btn-warning form-control">
							Editar
						</button>
					) : (
						//	</Link>
						<button type="submit" className="btn btn-primary form-control">
							Agregar
						</button>
					)}
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

AddContact.propTypes = {
	match: PropTypes.object
};
