import { useNavigate, useParams } from "react-router"
import { useLocalStorage, useEffectOnce } from "react-use";
import { useState } from "react";
import { contactDetail } from "../../lib/api/ContactApi";
import { alertError, alertSuccess } from "../../lib/alert";
import { addressCreate } from "../../lib/api/AddressApi";
import AddressNav from "../Elements/AddressNav";
import AddressForm from "../Elements/AddressForm";
import ContactInformation from "../Elements/ContactInformation";

export default function AddressCreate() {

    const navigate = useNavigate();
    const [token, _] = useLocalStorage('token', '');
    const { id } = useParams();
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

        const response = await addressCreate(token, id, data);
        const responseBody = await response.json();
        console.log(responseBody);

        if (response.status === 200) {
            await alertSuccess("Address created successfully");
            await navigate({
                pathname: `/dashboard/contacts/${id}`
            })
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

    useEffectOnce(() => {
        fetchContact()
            .then(() => console.log("Contact detail fetched successfully"));
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