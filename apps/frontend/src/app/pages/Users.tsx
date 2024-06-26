import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const fetchUsers = async () => {
    const response = await axios.get('https://backend-test-qll5.onrender.com/user/getAll');
    return response.data;
};

const handleDelete = async (id: string) => {
    const response = await axios.delete(`https://backend-test-qll5.onrender.com/user/delete/${id}`);
    return response;
}

const handleEdit = async (id: string) => {
    var x =  {
        fullName: "John Doe",
        email: "assas@gmail.com",
        phone: "1234567890",
        password: "12345678"	
    }
    const response = await axios.put(`https://backend-test-qll5.onrender.com/user/update/${id}`,x);
    return response.data;
}

const Users = () => {
    const { data, error, isLoading, refetch } = useQuery(
        {
            queryKey: ['users'],
            queryFn: fetchUsers,
            refetchInterval: 3000,
        }
    );

    const deleteMutation = useMutation({
        mutationFn: handleDelete,
        onSuccess: (data) => {
            console.log('User deleted successfully:', data);
            refetch();
        },
        onError: (error) => {
            console.error('Error deleting user:', error);
        },
    });

    const updateMutation = useMutation({
        mutationFn: handleEdit,
        onSuccess: (data) => {
            console.log('User updated successfully:', data);
            refetch();
        },
        onError: (error) => {
            console.error('Error updating user:', error);
        },
    });

    const deleteFunction = async (id: string) => {
        deleteMutation.mutate(id);
    }

    const updateFunction = async (id: string) => {
        updateMutation.mutate(id);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!Array.isArray(data)) {
        return <div>Unexpected data format</div>;
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 150 },
        { field: 'fullName', headerName: 'Full Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 150,
            renderCell: (params: any) => (             
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteFunction(params.row._id)}
                    >
                        Delete
                    </Button>                                 
            ),
        },        {
            field: 'edit',
            headerName: 'Edit',
            width: 150,
            renderCell: (params: any) => (             
                <Button
                variant="contained"
                color="secondary"
                onClick={() => updateFunction(params.row._id)}
            >
                Edit
            </Button>                          
            ),
        },
    ];

    const getRowId = (row: any) => row._id;

    return (
        <div style={{ height: 400, width: '100%' }}>
            <h1>User List</h1>
            <DataGrid
                rows={data}
                columns={columns}
                getRowId={getRowId}
            />
        </div>
    );
};

export default Users;
