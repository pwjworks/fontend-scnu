import { Table, Button } from 'antd';
import React, { useState, useEffect } from 'react';
const { Column } = Table;
import { getFetcher } from '../pages/api/fechers';
import delUsers from '../pages/api/del-users';
import useSWR from "swr";

export default function userTable() {
    const { data } = useSWR('http://localhost:8080/user', getFetcher)
    console.log(data)
    const [selected, setSelected] = useState([]);
    useEffect(() => {
        console.log(selected);
    }, [selected])

    const rowSelection = {
        onChange: (selectedRowKeys) => {
            setSelected(selectedRowKeys);
        },
    };
    const handleDelete = function () {
        if (selected.length !== 0) {
            delUsers({ ids: selected }).then((res) => {
                console.log("delete " + res);
                setSelected([]);

            })
        }
    }
    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" >
                    Add
                </Button>
                <Button type="primary" onClick={(e) => handleDelete()} danger style={{ marginLeft: 16 }} >
                    Delete
                </Button>

                <span style={{ marginLeft: 8 }}>

                </span>
            </div>
            <Table dataSource={data} rowKey={data => data.id} rowSelection={{ type: 'checkbox', ...rowSelection, }} pagination={{ pageSize: 10 }}>
                <Column title="Id" dataIndex="id" key="id" />
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Email" dataIndex="email" key="email" />
            </Table >
        </div >
    )
}