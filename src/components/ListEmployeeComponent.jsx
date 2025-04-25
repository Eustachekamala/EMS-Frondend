import { useEffect } from "react";
import { useState } from "react";
import { listEmployees } from "../services/EmployeeService";

function ListEmployeeComponent() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
            listEmployees().then((response) => {
                setEmployees(response.data)
            }).catch(error => {
                console.log(error);
            })
    },[])


    return (
        <div className="p-6 bg-gray-100">
            <h2 className="text-4xl font-bold text-center mb-6">List of Employees</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">Employee Id</th>
                            <th className="px-4 py-2 ">Employee Firstname</th>
                            <th className="px-4 py-2 ">Employee Lastname</th>
                            <th className="px-4 py-2 ">Employee Email</th>
                            <th className="px-4 py-2 ">Employee Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id} className="border-t hover:bg-gray-100">
                                <td className="px-4 py-2">{employee.id}</td>
                                <td className="px-4 py-2">{employee.firstname}</td>
                                <td className="px-4 py-2">{employee.lastname}</td>
                                <td className="px-4 py-2">{employee.email}</td>
                                <td className="px-4 py-2">{employee.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListEmployeeComponent;
