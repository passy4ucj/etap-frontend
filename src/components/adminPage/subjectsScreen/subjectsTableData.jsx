import axios from "axios";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { TOKEN } from "../../../constants/shared/loginTokenConstants";
import { baseUrl } from "../../../constants/shared/baseUrl"

// fetch function to get table data
export const fetchSubjectsData = async (pageSize, currentPage, orderBy = "") => {
    const token = window.localStorage.getItem(TOKEN);
    // const [modalState, setModalState] = useState(false);
    try {
        const res = await axios({
            method: 'get',
            url: `${baseUrl}/api/v1/subjects`,
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
                // onClick={(e) => {
                //     if (window.confirm("Are You Sure ?")) {
                //         // console.log(tableProps.row.original.id, tableProps.state.pageIndex);
                //         // props.onDeleteUser(tableProps.row.original.id, tableProps.state.pageIndex);

                //     }
                //     console.log(tableProps.row.original.id);
                // }}
                // /customer/${customer._id}/details`
            >
                <Link
                        to={`/adminpage/rankings/${tableProps.row.original.id}`}
                        // onClick={() => sidbarActive(e.id)}
                        // className={
                        // e.active
                        //     ? "nav-link active text-white"
                        //     : "nav-link text-white"
                        // }
                    >
                        Rankings
                </Link>
            </span>
        )
    },
    {
        Header: "Name",
        accessor: "name"
    },
    {
        Header: "Description",
        accessor: "description",
    },
];

