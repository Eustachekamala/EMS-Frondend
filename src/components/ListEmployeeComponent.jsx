import { useEffect } from "react";
import { useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router";

function ListEmployeeComponent() {
    const [employees, setEmployees] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        listEmployees()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function addNewEmployee() {
        navigator("/add-employee");
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`);
    }

    function handleDelete(id){
        deleteEmployee(id)
            .then(() => {
                setEmployees((prevEmployees) => {
                    prevEmployees.filter((emp) => emp.id !== id)
                });
            })
            .catch((error) => {
                console.log("Failled to delete employee:", error)
            })
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-4xl font-bold text-center mb-6">List of Employees</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left">Employee Id</th>
                            <th className="px-4 py-2 text-left">First Name</th>
                            <th className="px-4 py-2 text-left">Last Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Phone</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(employees) && employees.map((employee) => (
                            <tr key={employee.id} className="border-t hover:bg-gray-100">
                                <td className="px-4 py-2">{employee.id}</td>
                                <td className="px-4 py-2">{employee.firstname}</td>
                                <td className="px-4 py-2">{employee.lastname}</td>
                                <td className="px-4 py-2">{employee.email}</td>
                                <td className="px-4 py-2">{employee.phone}</td>
                                <td className="px-4 py-2 flex flex-row justify-around items-center">
                                    <button
                                        onClick={addNewEmployee}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mr-2"
                                    >
                                        Add Employee
                                    </button>
                                    <button
                                        onClick={() => updateEmployee(employee.id)} 
                                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg mr-2"
                                    >
                                        Update
                                    </button>
                                    <button 
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
                                        onClick={() => handleDelete(employee.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListEmployeeComponent;
