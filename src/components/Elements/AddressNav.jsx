import { Link } from "react-router"

export default function AddressNav({ id, children }) {

    return (
        <>
            <div className="flex items-center mb-6">
                <Link to={`/dashboard/contacts/${id}`} className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
                    <i className="fas fa-arrow-left mr-2" /> Back to Contact Details
                </Link>
                <h1 className="text-2xl font-bold text-white flex items-center">
                    <i className="fas fa-map-marker-alt text-blue-400 mr-3" /> {children}
                </h1>
            </div>
        </>
    )
}