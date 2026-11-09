
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

interface IMedicineRequest {
  _id: string;
  medicineName: string;
  quantity: number;
  reason?: string;
  urgency?: string;
  status: string;
  createdAt?: string;
}

function MyRequestspage() {
  const [requests, setRequests] = useState<IMedicineRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axiosInstance.get(
          "/medicines/my-requests"
        );

        console.log("My Requests Response:", response.data);

        const requestData =
          response.data.requests ||
          response.data.data ||
          response.data;

        setRequests(Array.isArray(requestData) ? requestData : []);
      } catch (error: any) {
        console.error("Fetch Requests Error:", error);
        console.error("Status:", error.response?.status);
        console.error("Backend Response:", error.response?.data);

        setError(
          error.response?.data?.message ||
            "Unable to fetch your requests."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <h3>Loading Your Requests...</h3>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.heading}>My Medicine Requests</h2>

            <p style={styles.subtitle}>
              Track and manage your medicine requests.
            </p>
          </div>

          <Link to="/user/request-medicine" style={styles.requestButton}>
            + Request Medicine
          </Link>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryIcon}>💊</div>

          <div>
            <h3 style={styles.summaryTitle}>Total Requests</h3>

            <p style={styles.summaryCount}>{requests.length}</p>
          </div>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        {requests.length === 0 ? (
          <div style={styles.emptyCard}>
            <div style={styles.emptyIcon}>📦</div>

            <h3 style={styles.emptyTitle}>
              No Medicine Requests Yet
            </h3>

            <p style={styles.emptyText}>
              You haven't submitted any medicine requests.
              Request the support you need through MedShare.
            </p>

            <Link
              to="/user/request-medicine"
              style={styles.emptyButton}
            >
              Request Medicine
            </Link>
          </div>
        ) : (
          <div style={styles.tableCard}>
            <div style={styles.tableHeader}>
              <h3 style={styles.tableTitle}>Request History</h3>

              <span style={styles.tableCount}>
                {requests.length} Requests
              </span>
            </div>

            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Medicine Name</th>
                    <th style={styles.th}>Quantity</th>
                    <th style={styles.th}>Urgency</th>
                    <th style={styles.th}>Reason</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Requested On</th>
                  </tr>
                </thead>

                <tbody>
                  {requests.map((request) => {
                    const status = request.status || "Pending";

                    const statusStyle =
                      status.toLowerCase() === "approved"
                        ? styles.approved
                        : status.toLowerCase() === "rejected"
                        ? styles.rejected
                        : status.toLowerCase() === "fulfilled"
                        ? styles.fulfilled
                        : styles.pending;

                    return (
                      <tr key={request._id}>
                        <td style={styles.td}>
                          <div style={styles.medicineName}>
                            💊 {request.medicineName || "Medicine"}
                          </div>
                        </td>

                        <td style={styles.td}>
                          <span style={styles.quantity}>
                            {request.quantity}
                          </span>
                        </td>

                        <td style={styles.td}>
                          {request.urgency || "Normal"}
                        </td>

                        <td style={styles.td}>
                          {request.reason || "-"}
                        </td>

                        <td style={styles.td}>
                          <span
                            style={{
                              ...styles.statusBadge,
                              ...statusStyle,
                            }}
                          >
                            {status}
                          </span>
                        </td>

                        <td style={styles.td}>
                          {request.createdAt
                            ? new Date(
                                request.createdAt
                              ).toLocaleDateString()
                            : "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div style={styles.footer}>
          <Link to="/user/dashboard" style={styles.backLink}>
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  page: {
    minHeight: "100vh",
    padding: "45px 20px",
    background:
      "linear-gradient(135deg, #eaf8f7, #f5fafa, #e3f4f3)",
    fontFamily: "Roboto, Arial, sans-serif",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "30px",
  },

  heading: {
    color: "#005b70",
    fontSize: "30px",
    fontWeight: 800,
    margin: "0 0 10px",
  },

  subtitle: {
    color: "#637b7d",
    fontSize: "15px",
    margin: 0,
  },

  requestButton: {
    padding: "13px 22px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #008f95, #005b70)",
    color: "white",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "15px",
  },

  summaryCard: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "25px",
    maxWidth: "300px",
    background: "white",
    borderRadius: "16px",
    border: "1px solid #dceeee",
    boxShadow: "0 8px 25px rgba(0, 91, 112, 0.06)",
    marginBottom: "30px",
  },

  summaryIcon: {
    width: "65px",
    height: "65px",
    borderRadius: "14px",
    background: "#e0f5f4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "30px",
  },

  summaryTitle: {
    margin: "0 0 5px",
    fontSize: "15px",
    color: "#637b7d",
  },

  summaryCount: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 800,
    color: "#005b70",
  },

  tableCard: {
    background: "white",
    borderRadius: "18px",
    border: "1px solid #dceeee",
    boxShadow: "0 10px 30px rgba(0, 91, 112, 0.07)",
    overflow: "hidden",
  },

  tableHeader: {
    padding: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    borderBottom: "1px solid #e5eeee",
  },

  tableTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 700,
    color: "#005b70",
  },

  tableCount: {
    background: "#e0f5f4",
    color: "#008f95",
    padding: "7px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: 700,
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    minWidth: "950px",
    borderCollapse: "collapse",
    textAlign: "left",
  },

  th: {
    background: "#f2fafa",
    color: "#005b70",
    padding: "17px 20px",
    fontSize: "14px",
    fontWeight: 700,
    borderBottom: "1px solid #dceeee",
  },

  td: {
    padding: "18px 20px",
    color: "#536b6d",
    fontSize: "14px",
    borderBottom: "1px solid #edf3f3",
  },

  medicineName: {
    fontWeight: 700,
    color: "#005b70",
  },

  quantity: {
    display: "inline-block",
    padding: "6px 12px",
    background: "#eaf8f7",
    borderRadius: "7px",
    color: "#008f95",
    fontWeight: 700,
  },

  statusBadge: {
    display: "inline-block",
    padding: "7px 13px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "capitalize",
  },

  approved: {
    background: "#e6f7ed",
    color: "#218838",
  },

  rejected: {
    background: "#ffebee",
    color: "#c62828",
  },

  pending: {
    background: "#fff4df",
    color: "#b7791f",
  },

  fulfilled: {
    background: "#e3f2fd",
    color: "#1565c0",
  },

  emptyCard: {
    background: "white",
    borderRadius: "18px",
    padding: "55px 25px",
    textAlign: "center",
    border: "1px solid #dceeee",
    boxShadow: "0 10px 30px rgba(0, 91, 112, 0.06)",
  },

  emptyIcon: {
    fontSize: "55px",
    marginBottom: "15px",
  },

  emptyTitle: {
    color: "#005b70",
    fontSize: "23px",
    fontWeight: 800,
    margin: "0 0 12px",
  },

  emptyText: {
    color: "#637b7d",
    maxWidth: "500px",
    margin: "0 auto 25px",
    lineHeight: 1.8,
    fontSize: "15px",
  },

  emptyButton: {
    display: "inline-block",
    padding: "13px 25px",
    background: "linear-gradient(135deg, #008f95, #005b70)",
    borderRadius: "10px",
    color: "white",
    textDecoration: "none",
    fontWeight: 700,
  },

  errorBox: {
    background: "#fff0f0",
    border: "1px solid #ffcaca",
    color: "#c62828",
    padding: "14px",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  footer: {
    marginTop: "30px",
  },

  backLink: {
    color: "#008f95",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "15px",
  },

  loadingContainer: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#005b70",
  },

  spinner: {
    width: "45px",
    height: "45px",
    border: "4px solid #dceeee",
    borderTop: "4px solid #008f95",
    borderRadius: "50%",
    animation: "request-spin 0.8s linear infinite",
  },
};

export default MyRequestspage;
