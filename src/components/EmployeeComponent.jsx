import React, { useState, useEffect } from 'react';
import { createEmployee, updateEmployee, getEmployeeById } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeComponent() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();
    const { id } = useParams();

    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: ''
    });

    useEffect(() => {
        if (id) {
            getEmployeeById(id)
                .then(response => {
                    const emp = response.data;
                    setFirstname(emp.firstname);
                    setLastname(emp.lastname);
                    setEmail(emp.email);
                    setPhone(emp.phone);
                    setPassword(emp.password);
                })
                .catch(error => {
                    console.error("Error fetching employee:", error);
                });
        }
    }, [id]);

    function handleChange(event) {
        const { id, value } = event.target;
        const setters = {
            firstname: setFirstname,
            lastname: setLastname,
            email: setEmail,
            phone: setPhone,
            password: setPassword,
        };
        setters[id]?.(value);
    }

    function saveEmployee(e) {
        e.preventDefault();
        if (validateForm()) {
            const employee = { firstname, lastname, email, phone, password };
            if (id) {
                updateEmployee(id, employee).then(() => {
                    navigator("/employees");
                });
            } else {
                createEmployee(employee).then(() => {
                    navigator("/employees");
                });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = {};

        if (!firstname.trim()) {
            errorsCopy.firstname = 'Firstname is required';
            valid = false;
        } else {
            errorsCopy.firstname = '';
        }

        if (!lastname.trim()) {
            errorsCopy.lastname = 'Lastname is required';
            valid = false;
        } else {
            errorsCopy.lastname = '';
        }

        if (!email.trim()) {
            errorsCopy.email = 'Email is required';
            valid = false;
        } else {
            errorsCopy.email = '';
        }

        if (!phone.trim()) {
            errorsCopy.phone = 'Phone is required';
            valid = false;
        } else {
            errorsCopy.phone = '';
        }

        if (!password.trim()) {
            errorsCopy.password = 'Password is required';
            valid = false;
        } else {
            errorsCopy.password = '';
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-2xl font-bold py-6 text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-2xl font-bold py-6 text-center'>Add Employee</h2>
        }
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
                {pageTitle()}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
                        Firstname
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                            ${errors.firstname ? 'border-red-500' : ''}`}
                        id="firstname"
                        type="text"
                        value={firstname}
                        onChange={handleChange}
                        placeholder="Enter employee firstname"
                    />
                    {errors.firstname && <div className='text-red-500 text-sm'>{errors.firstname}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                        Lastname
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                            ${errors.lastname ? 'border-red-500' : ''}`}
                        id="lastname"
                        type="text"
                        value={lastname}
                        onChange={handleChange}
                        placeholder="Enter employee lastname"
                    />
                    {errors.lastname && <div className='text-red-500 text-sm'>{errors.lastname}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                            ${errors.email ? 'border-red-500' : ''}`}
                        id="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter employee email"
                    />
                    {errors.email && <div className='text-red-500 text-sm'>{errors.email}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        Phone
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                            ${errors.phone ? 'border-red-500' : ''}`}
                        id="phone"
                        type="text"
                        value={phone}
                        onChange={handleChange}
                        placeholder="Enter employee phone"
                    />
                    {errors.phone && <div className='text-red-500 text-sm'>{errors.phone}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                            ${errors.password ? 'border-red-500' : ''}`}
                        id="password"
                        type="password"
                        value={password}
                        onChange={handleChange}
                        placeholder="Enter employee password"
                    />
                    {errors.password && <div className='text-red-500 text-sm'>{errors.password}</div>}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={saveEmployee}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EmployeeComponent;
