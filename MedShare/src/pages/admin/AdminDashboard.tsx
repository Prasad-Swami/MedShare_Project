
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Section =
  | "Dashboard"
  | "Users"
  | "Organizations"
  | "Donations"
  | "Requests"
  | "Messages";

interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface IOrganization {
  id: number;
  name: string;
  email: string;
  type: string;
  status: string;
}

interface IDonation {
  id: number;
  donor: string;
  medicine: string;
  quantity: number;
  expiry: string;
  status: string;
}

interface IRequest {
  id: number;
  organization: string;
  medicine: string;
  quantity: number;
  reason: string;
  status: string;
}

interface IMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
}

function AdminDashboard() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] =
    useState<Section>("Dashboard");

  const [search, setSearch] = useState("");

  const [users, setUsers] = useState<IUser[]>([
    {
      id: 1,
      name: "Aaditi Sarode",
      email: "aaditi@gmail.com",
      role: "User",
      status: "Active",
    },
    {
      id: 2,
      name: "Rahul Patil",
      email: "rahul@gmail.com",
      role: "Donor",
      status: "Active",
    },
    {
      id: 3,
      name: "Sneha Kulkarni",
      email: "sneha@gmail.com",
      role: "User",
      status: "Inactive",
    },
  ]);

  const [organizations, setOrganizations] =
    useState<IOrganization[]>([
      {
        id: 1,
        name: "Helping Hands NGO",
        email: "helpinghands@gmail.com",
        type: "NGO",
        status: "Pending",
      },
      {
        id: 2,
        name: "City Healthcare",
        email: "cityhealth@gmail.com",
        type: "Healthcare",
        status: "Approved",
      },
      {
        id: 3,
        name: "Care Foundation",
        email: "carefoundation@gmail.com",
        type: "NGO",
        status: "Pending",
      },
    ]);

  const [donations, setDonations] = useState<IDonation[]>([
    {
      id: 1,
      donor: "Rahul Patil",
      medicine: "Paracetamol",
      quantity: 100,
      expiry: "2027-05-20",
      status: "Pending",
    },
    {
      id: 2,
      donor: "City Pharmacy",
      medicine: "Amoxicillin",
      quantity: 50,
      expiry: "2027-08-15",
      status: "Approved",
    },
    {
      id: 3,
      donor: "Amit Sinha",
      medicine: "Vitamin C",
      quantity: 30,
      expiry: "2027-12-10",
      status: "Completed",
    },
  ]);

  const [requests, setRequests] = useState<IRequest[]>([
    {
      id: 1,
      organization: "Helping Hands NGO",
      medicine: "Paracetamol",
      quantity: 200,
      reason: "Patient assistance",
      status: "Pending",
    },
    {
      id: 2,
      organization: "City Healthcare",
      medicine: "Amoxicillin",
      quantity: 100,
      reason: "Hospital requirement",
      status: "Approved",
    },
    {
      id: 3,
      organization: "Care Foundation",
      medicine: "Vitamin C",
      quantity: 50,
      reason: "Community healthcare",
      status: "Pending",
    },
  ]);

  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya@gmail.com",
      subject: "Donation Inquiry",
      message: "I would like to donate medicines.",
      status: "Unread",
    },
    {
      id: 2,
      name: "Amit Joshi",
      email: "amit@gmail.com",
      subject: "NGO Membership",
      message: "Please provide membership details.",
      status: "Read",
    },
  ]);

  const sections: Section[] = [
    "Dashboard",
    "Users",
    "Organizations",
    "Donations",
    "Requests",
    "Messages",
  ];

  const colors = {
    primary: "#008f95",
    dark: "#005b70",
    light: "#e8f7f7",
    background: "#f4f8fa",
    white: "#ffffff",
    text: "#263238",
    muted: "#64748b",
    border: "#e2e8f0",
  };

  const updateStatus = <T extends { id: number; status: string }>(
    list: T[],
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    id: number,
    status: string
  ) => {
    setter(
      list.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const filtered = <T extends object>(
    data: T[],
    fields: (keyof T)[]
  ) =>
    data.filter((item) =>
      fields.some((field) =>
        String(item[field])
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const statusStyle = (status: string): React.CSSProperties => {
    const background =
      status === "Approved" ||
      status === "Active" ||
      status === "Completed" ||
      status === "Read"
        ? "#dcfce7"
        : status === "Rejected" ||
          status === "Inactive"
        ? "#fee2e2"
        : "#fef3c7";

    const color =
      status === "Approved" ||
      status === "Active" ||
      status === "Completed" ||
      status === "Read"
        ? "#166534"
        : status === "Rejected" ||
          status === "Inactive"
        ? "#991b1b"
        : "#92400e";

    return {
      background,
      color,
      padding: "5px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: 600,
      display: "inline-block",
    };
  };

  const buttonStyle = (
    background: string,
    color = "#ffffff"
  ): React.CSSProperties => ({
    background,
    color,
    border: "none",
    padding: "8px 12px",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 600,
    margin: "2px",
  });

  const cardStyle: React.CSSProperties = {
    background: colors.white,
    borderRadius: "14px",
    padding: "22px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.04)",
    border: `1px solid ${colors.border}`,
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "700px",
  };

  const thStyle: React.CSSProperties = {
    textAlign: "left",
    padding: "14px",
    background: "#f8fafc",
    color: colors.muted,
    fontSize: "12px",
    textTransform: "uppercase",
    borderBottom: `1px solid ${colors.border}`,
  };

  const tdStyle: React.CSSProperties = {
    padding: "14px",
    fontSize: "13px",
    color: colors.text,
    borderBottom: `1px solid ${colors.border}`,
  };

  const renderTable = (
    headers: string[],
    rows: React.ReactNode[]
  ) => (
    <div style={{ overflowX: "auto" }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} style={thStyle}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );

  const renderDashboard = () => (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "18px",
          marginBottom: "25px",
        }}
      >
        {[
          {
            title: "Total Users",
            value: users.length,
            icon: "👥",
          },
          {
            title: "Organizations",
            value: organizations.length,
            icon: "🏥",
          },
          {
            title: "Total Donations",
            value: donations.length,
            icon: "💊",
          },
          {
            title: "Medicine Requests",
            value: requests.length,
            icon: "📋",
          },
          {
            title: "Pending Approvals",
            value:
              organizations.filter((o) => o.status === "Pending").length +
              requests.filter((r) => r.status === "Pending").length,
            icon: "⏳",
          },
        ].map((item) => (
          <div key={item.title} style={cardStyle}>
            <div style={{ fontSize: "28px" }}>{item.icon}</div>
            <p style={{ color: colors.muted, fontSize: "13px" }}>
              {item.title}
            </p>
            <h2
              style={{
                color: colors.dark,
                margin: 0,
                fontSize: "28px",
              }}
            >
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      <div style={cardStyle}>
        <h3 style={{ color: colors.dark, marginTop: 0 }}>
          Pending Activities
        </h3>

        <p>
          🏥 NGO Memberships Pending:{" "}
          <strong>
            {organizations.filter((o) => o.status === "Pending").length}
          </strong>
        </p>

        <p>
          💊 Donations Pending:{" "}
          <strong>
            {donations.filter((d) => d.status === "Pending").length}
          </strong>
        </p>

        <p>
          📋 Medicine Requests Pending:{" "}
          <strong>
            {requests.filter((r) => r.status === "Pending").length}
          </strong>
        </p>

        <p>
          ✉️ Unread Messages:{" "}
          <strong>
            {messages.filter((m) => m.status === "Unread").length}
          </strong>
        </p>
      </div>
    </>
  );

  const renderUsers = () =>
    renderTable(
      ["Name", "Email", "Role", "Status", "Action"],
      filtered(users, ["name", "email", "role", "status"]).map(
        (user) => (
          <tr key={user.id}>
            <td style={tdStyle}>{user.name}</td>
            <td style={tdStyle}>{user.email}</td>
            <td style={tdStyle}>{user.role}</td>
            <td style={tdStyle}>
              <span style={statusStyle(user.status)}>
                {user.status}
              </span>
            </td>
            <td style={tdStyle}>
              <button
                style={buttonStyle(
                  user.status === "Active" ? "#dc2626" : colors.primary
                )}
                onClick={() =>
                  updateStatus(
                    users,
                    setUsers,
                    user.id,
                    user.status === "Active" ? "Inactive" : "Active"
                  )
                }
              >
                {user.status === "Active" ? "Deactivate" : "Activate"}
              </button>
            </td>
          </tr>
        )
      )
    );

  const renderOrganizations = () =>
    renderTable(
      ["Organization", "Email", "Type", "Status", "Action"],
      filtered(organizations, [
        "name",
        "email",
        "type",
        "status",
      ]).map((org) => (
        <tr key={org.id}>
          <td style={tdStyle}>{org.name}</td>
          <td style={tdStyle}>{org.email}</td>
          <td style={tdStyle}>{org.type}</td>
          <td style={tdStyle}>
            <span style={statusStyle(org.status)}>
              {org.status}
            </span>
          </td>
          <td style={tdStyle}>
            {org.status === "Pending" && (
              <>
                <button
                  style={buttonStyle(colors.primary)}
                  onClick={() =>
                    updateStatus(
                      organizations,
                      setOrganizations,
                      org.id,
                      "Approved"
                    )
                  }
                >
                  Approve
                </button>

                <button
                  style={buttonStyle("#dc2626")}
                  onClick={() =>
                    updateStatus(
                      organizations,
                      setOrganizations,
                      org.id,
                      "Rejected"
                    )
                  }
                >
                  Reject
                </button>
              </>
            )}
          </td>
        </tr>
      ))
    );

  const renderDonations = () =>
    renderTable(
      ["Donor", "Medicine", "Quantity", "Expiry Date", "Status", "Action"],
      filtered(donations, [
        "donor",
        "medicine",
        "quantity",
        "expiry",
        "status",
      ]).map((donation) => (
        <tr key={donation.id}>
          <td style={tdStyle}>{donation.donor}</td>
          <td style={tdStyle}>{donation.medicine}</td>
          <td style={tdStyle}>{donation.quantity}</td>
          <td style={tdStyle}>{donation.expiry}</td>
          <td style={tdStyle}>
            <span style={statusStyle(donation.status)}>
              {donation.status}
            </span>
          </td>
          <td style={tdStyle}>
            {donation.status === "Pending" && (
              <>
                <button
                  style={buttonStyle(colors.primary)}
                  onClick={() =>
                    updateStatus(
                      donations,
                      setDonations,
                      donation.id,
                      "Approved"
                    )
                  }
                >
                  Approve
                </button>

                <button
                  style={buttonStyle("#dc2626")}
                  onClick={() =>
                    updateStatus(
                      donations,
                      setDonations,
                      donation.id,
                      "Rejected"
                    )
                  }
                >
                  Reject
                </button>
              </>
            )}

            {donation.status === "Approved" && (
              <button
                style={buttonStyle(colors.dark)}
                onClick={() =>
                  updateStatus(
                    donations,
                    setDonations,
                    donation.id,
                    "Completed"
                  )
                }
              >
                Mark Completed
              </button>
            )}
          </td>
        </tr>
      ))
    );

  const renderRequests = () =>
    renderTable(
      [
        "Organization",
        "Medicine",
        "Quantity",
        "Reason",
        "Status",
        "Action",
      ],
      filtered(requests, [
        "organization",
        "medicine",
        "quantity",
        "reason",
        "status",
      ]).map((request) => (
        <tr key={request.id}>
          <td style={tdStyle}>{request.organization}</td>
          <td style={tdStyle}>{request.medicine}</td>
          <td style={tdStyle}>{request.quantity}</td>
          <td style={tdStyle}>{request.reason}</td>
          <td style={tdStyle}>
            <span style={statusStyle(request.status)}>
              {request.status}
            </span>
          </td>
          <td style={tdStyle}>
            {request.status === "Pending" && (
              <>
                <button
                  style={buttonStyle(colors.primary)}
                  onClick={() =>
                    updateStatus(
                      requests,
                      setRequests,
                      request.id,
                      "Approved"
                    )
                  }
                >
                  Approve
                </button>

                <button
                  style={buttonStyle("#dc2626")}
                  onClick={() =>
                    updateStatus(
                      requests,
                      setRequests,
                      request.id,
                      "Rejected"
                    )
                  }
                >
                  Reject
                </button>
              </>
            )}
          </td>
        </tr>
      ))
    );

  const renderMessages = () =>
    renderTable(
      ["Name", "Email", "Subject", "Message", "Status", "Action"],
      filtered(messages, [
        "name",
        "email",
        "subject",
        "message",
        "status",
      ]).map((message) => (
        <tr key={message.id}>
          <td style={tdStyle}>{message.name}</td>
          <td style={tdStyle}>{message.email}</td>
          <td style={tdStyle}>{message.subject}</td>
          <td style={{ ...tdStyle, maxWidth: "220px" }}>
            {message.message}
          </td>
          <td style={tdStyle}>
            <span style={statusStyle(message.status)}>
              {message.status}
            </span>
          </td>
          <td style={tdStyle}>
            {message.status === "Unread" && (
              <button
                style={buttonStyle(colors.primary)}
                onClick={() =>
                  updateStatus(
                    messages,
                    setMessages,
                    message.id,
                    "Read"
                  )
                }
              >
                Mark Read
              </button>
            )}

            <button
              style={buttonStyle("#dc2626")}
              onClick={() =>
                setMessages(
                  messages.filter((m) => m.id !== message.id)
                )
              }
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    );

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return renderDashboard();
      case "Users":
        return renderUsers();
      case "Organizations":
        return renderOrganizations();
      case "Donations":
        return renderDonations();
      case "Requests":
        return renderRequests();
      case "Messages":
        return renderMessages();
      default:
        return renderDashboard();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: colors.background,
        fontFamily: "Arial, sans-serif",
        color: colors.text,
      }}
    >

      <aside
        style={{
          width: "250px",
          minWidth: "250px",
          background: colors.dark,
          color: colors.white,
          padding: "25px 15px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "5px",
            fontSize: "25px",
          }}
        >
          💊 MedShare
        </h2>

        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#bce8e8",
            marginBottom: "35px",
          }}
        >
          Admin Panel
        </p>

        {sections.map((section) => (
          <button
            key={section}
            onClick={() => {
              setActiveSection(section);
              setSearch("");
            }}
            style={{
              width: "100%",
              padding: "14px 16px",
              marginBottom: "8px",
              border: "none",
              borderRadius: "9px",
              textAlign: "left",
              fontSize: "14px",
              cursor: "pointer",
              background:
                activeSection === section
                  ? colors.primary
                  : "transparent",
              color: colors.white,
              fontWeight: activeSection === section ? 700 : 500,
            }}
          >
            {section === "Dashboard" && "📊"}
            {section === "Users" && "👥"}
            {section === "Organizations" && "🏥"}
            {section === "Donations" && "💊"}
            {section === "Requests" && "📋"}
            {section === "Messages" && "✉️"} {section}
          </button>
        ))}

        <div style={{ flex: 1 }} />

        <button
          onClick={handleLogout}
          style={{
            padding: "13px",
            border: "1px solid #ffffff50",
            borderRadius: "9px",
            background: "transparent",
            color: colors.white,
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, minWidth: 0, padding: "30px" }}>
        <header
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1
              style={{
                color: colors.dark,
                margin: 0,
                fontSize: "28px",
              }}
            >
              {activeSection}
            </h1>

            <p
              style={{
                color: colors.muted,
                fontSize: "14px",
                marginTop: "8px",
              }}
            >
              Manage and monitor MedShare activities
            </p>
          </div>

          <div
            style={{
              background: colors.white,
              padding: "12px 18px",
              borderRadius: "10px",
              border: `1px solid ${colors.border}`,
              color: colors.dark,
              fontWeight: 600,
            }}
          >
            👤 Administrator
          </div>
        </header>

        {activeSection !== "Dashboard" && (
          <div style={{ ...cardStyle, marginBottom: "22px" }}>
            <input
              type="text"
              placeholder={`Search ${activeSection.toLowerCase()}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px 15px",
                border: `1px solid ${colors.border}`,
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>
        )}

        <section style={cardStyle}>
          {activeSection !== "Dashboard" && (
            <h3
              style={{
                color: colors.dark,
                marginTop: 0,
                marginBottom: "20px",
              }}
            >
              {activeSection} Management
            </h3>
          )}

          {renderContent()}
        </section>

        <footer
          style={{
            textAlign: "center",
            color: colors.muted,
            fontSize: "12px",
            marginTop: "25px",
          }}
        >
          © 2026 MedShare | Donate • Share • Care
        </footer>
      </main>
    </div>
  );
}

export default AdminDashboard;
