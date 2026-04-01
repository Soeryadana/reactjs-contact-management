import { Link, useParams } from "react-router";
import { addressDetail, addressUpdate } from "../../lib/api/AddressApi";
import { contactDetail } from "../../lib/api/ContactApi";
import { alertError, alertSuccess } from "../../lib/alert";
import { useLocalStorage, useEffectOnce } from "react-use";
import { useState } from "react";
import AddressNav from "../Elements/AddressNav";
import ContactInformation from "../Elements/ContactInformation";
import AddressForm from "../Elements/AddressForm";

export default function AddressEdit() {

    const { id, addressId } = useParams();
    const [token, _] = useLocalStorage('token', '');
    const [contact, setContact] = useState({});
    const [data, setData] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;

        setData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await addressUpdate(token, id, addressId, data);
        const responseBody = await response.json();
        console.log(responseBody);

        if (response.status === 200) {
            await alertSuccess("Address updated successfully");
        } else {
            await alertError(responseBody.errors);
        }
    }

    async function fetchContact() {
        const response = await contactDetail(token, id);
        const responseBody = await response.json();
        console.log(responseBody);

        if (response.status === 200) {
            setContact(responseBody.data);
        } else {
            await alertError(responseBody.errors);
        }
    }

    async function fetchAddress() {
        const response = await addressDetail(token, id, addressId);
        const responseBody = await response.json();
        console.log(responseBody);

        if (response.status === 200) {
            setData(responseBody.data)
        } else {
            await alertError(responseBody.errors)
        }
    }

    useEffectOnce(() => {
        fetchContact()
            .then(() => console.log("Contact detail fetched successfully"));
        fetchAddress()
            .then(() => console.log("Address fetched successfully"));
    })

    return (
        <>
            <main className="container mx-auto px-4 py-8 flex-grow">
                <AddressNav id={id}>
                    Edit Conctact
                </AddressNav>
                <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
                    <div className="p-8">
                        {/* Contact Information */}
                        <ContactInformation contact={contact} />

                        <AddressForm handleSubmit={handleSubmit} id={id} data={data} onChange={handleChange} />
                    </div>
                </div>
            </main>
        </>
    )
}