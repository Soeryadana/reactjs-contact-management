export default function ContactInformation({ contact }) {
    return (
        <>
            <div className="mb-6 pb-6 border-b border-gray-700">
                <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-md">
                        <i className="fas fa-user text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-white">{contact.first_name} {contact.last_name}</h2>
                        <p className="text-gray-300 text-sm">{contact.email} • {contact.phone}</p>
                    </div>
                </div>
            </div>
        </>
    )
}