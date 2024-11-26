import axios from "axios";
import React from "react";
import { TOKEN } from "../../../constants/shared/loginTokenConstants";
import { baseUrl } from "../../../constants/shared/baseUrl"

// fetch function to get table data
export const fetchUsersData = async (pageSize, currentPage, orderBy = "") => {
    const token = window.localStorage.getItem(TOKEN);
    try {
        const res = await axios({
            method: 'get',
            url: `${baseUrl}/api/v1/auth/users`,
            // url: `https://unixforapi.hazelsoft.net/api/v1/user/users?PageSize=${pageSize}&PageNumber=${currentPage}&OrderBy=${orderBy}`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return res;
    }
    catch (err) {

        return err
    }
}

// Defining Table Header and Binding Data
export const Columns = [
    {
        Header: "Actions",
        id: "actions",
        accessor: "actions",

        Cell: (tableProps) => (
            <span
                style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "none"
                }}
                onClick={(e) => {
                    if (window.confirm("Are You Sure ?")) {
                        // console.log(tableProps.row.original.id, tableProps.state.pageIndex);
                        // props.onDeleteUser(tableProps.row.original.id, tableProps.state.pageIndex);

                    }

                }}
            >
                Delete
            </span>
        )
    },
    {
        Header: "Name",
        accessor: "name"
    },
    {
        Header: "Email",
        accessor: "email",
    },
    {
        Header: "Role",
        accessor: "role"
    },
];

