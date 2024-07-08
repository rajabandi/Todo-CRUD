import React, { useEffect, useState } from 'react'
import Select from "react-select";
import { TodolistService } from '../services/TodolistService'
import { Form, Modal, Button, Col, Row } from 'react-bootstrap';


const Todo = () => {
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [inputTitle, setinputTitle] = useState("");
    const [inputDesc, setinputDesc] = useState("");
    const [inputStatus, setinputStatus] = useState("");
    const [filteredData, setFilteredData] = useState(null);
    const [rowId, setRowID] = useState("");
    const [showDelete, setShowDelete] = useState(false);
    const [header, setHeader] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        TodolistService.getTodos().then((response) => {
            setData(response.data)
        });
    }, []);

    const handleDelete = (index) => {
        setRowID(index);
        setShowDelete(true);
    };

    const confirmDelete = () => {
        let id = data.find((x) => x._id === rowId)._id;
        TodolistService.deleteTodo(id).then(() => {
            TodolistService.getTodos().then((res) => {
                setData(res.data);
            }).catch((err) => {
                console.log(err)
            })
        });
        setShowDelete(false);
    }
    const handleEdit = (id) => {
        setShowForm(true);
        let newEditItem = data.find((elem) => {
            return elem._id === id;
        });
        setinputTitle(newEditItem.titile);
        setinputDesc(newEditItem.description);
        setinputStatus(newEditItem.status);
        setRowID(id);
        setHeader(true);
    };

    const handleAdd = () => {
        setShowForm(true);
        setinputTitle("");
        setinputDesc("");
        setinputStatus("");
        setHeader(false);
    }

    const closeForm = () => {
        setShowForm(false);
    }

    const handleSubmit = () => {
        const allinputs = {
            titile: inputTitle,
            description: inputDesc,
            status: inputStatus
        };
        if (rowId) {
            TodolistService.updateTodo(allinputs, rowId).then(() => {
                TodolistService.getTodos().then((res) => {
                    setData(res.data);
                });
            }).catch((err) => {
                console.log(err.response.data.message);
                setError(err.response.data.message);
            })
        } else {
            TodolistService.createTodo(allinputs).then(() => {
                TodolistService.getTodos().then((res) => {
                    setData(res.data);
                });
            }).catch((err) => {
                console.log(err.response.data.message);
                setError(err.response.data.message);
            })
        }
        setinputTitle("");
        setinputDesc("");
        setinputStatus("");
        setRowID("");
        setShowForm(false);
    }

    const status = Array.from(
        new Set(data.map((task) => task.status))
    )

    const statusOptions = status.map((status) => ({
        value: status,
        label: status
    }))

    const filteredTasks = filteredData ? data.filter((x) => x.status === filteredData.value) : data;

    return (
        <div className=''>
            <div className="d-flex justify-content-end m-2">
                <div>
                    <button className="btn btn-primary mx-2 " onClick={handleAdd}>
                        New
                    </button>
                </div>
                <div className="my-auto">
                    <Select
                        options={statusOptions}
                        isClearable
                        placeholder="Filter the Status"
                        onChange={(x) => setFilteredData(x)}
                        value={filteredData}
                    />
                </div>
            </div>
            {/* {error&&error} */}
            {showForm &&
                <Modal
                    show={showForm}
                    onHide={() => setShowForm(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            {!header === true ? "Add Task" : " Edit Task"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="2">
                                    Titile
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" required placeholder="Titile" value={inputTitle} onChange={(e) => setinputTitle(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="2">
                                    Description
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control as="textarea" rows={3} value={inputDesc} placeholder="Description" onChange={(e) => setinputDesc(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Status
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Select aria-label="Default select example" placeholder="Please select the status" value={inputStatus} onChange={(e) => setinputStatus(e.target.value)} >
                                        <option >Open this select menu</option>
                                        <option value="Todo" >Todo</option>
                                        <option value="Inprogress">Inprogress</option>
                                        <option value="Completed">Completed</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleSubmit}>Submit form</Button>
                        <Button onClick={closeForm}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            }

            {showDelete &&
                <Modal
                    show={showDelete}
                    onHide={() => setShowDelete(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            {"Confirm"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {"Are you sure you want to delete selected todo?"}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={confirmDelete}>Delete</Button>
                        <Button onClick={() => setShowDelete(false)}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            }

            {data.length > 0 ?
                <div className="container py-2 ">
                    {filteredTasks.map((elem) =>
                        <div
                            className="row border rounded shadow p-3 mb-3 bg-white rounded  p-2"
                            key={elem.id}
                        >
                            <div className="col-12 d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 className='text-start'>{elem.titile}</h4>
                                    <div className='text-start'>{elem.description}</div>
                                    <div className='text-start'>{elem.status}</div>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-primary mx-2"
                                        onClick={() => handleEdit(elem._id)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger mx-2"
                                        onClick={() => handleDelete(elem._id)}
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}
                </div> : "No Todos"
            }
        </div>
    )
}

export default Todo