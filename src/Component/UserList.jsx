import { useState, useEffect } from 'react';
import "./UserList.css"

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const Controller = new AbortController();


        async function fetchUsers() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch("https://jsonplaceholder.typicode.com/users", {
                    signal: Controller.signal,
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                if (!Controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchUsers();

        return () => {
            Controller.abort();
        };
    }, []);

  if (loading) return <p className="user-status">Loading users...</p>;
  if (error)
    return <p className="user-status user-status--error">Error: {error}</p>;

  return (
    <section className="user-table-card">
      <h3 className="user-table-card__title">Students</h3>

      <div className="user-table-scroll">
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className="user-table__num">{index + 1}</td>
                <td className="user-table__name">{user.name}</td>
                <td className="user-table__username">@{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default UserList;