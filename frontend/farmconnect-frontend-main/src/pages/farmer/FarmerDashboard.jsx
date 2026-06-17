import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const [toasts, setToasts] = useState([]);

  // Replace with real user data from AuthContext later
  const farmerName = "Okwir";

  function logout() {
    if (window.confirm("Sign out of Vuna?")) {
      localStorage.clear();
      navigate("/login");
    }
  }

  function showToast(title, msg, type = "success") {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }

  const toastIcons = {
    success: "bi-check-circle-fill",
    error: "bi-x-circle-fill",
    warning: "bi-exclamation-triangle-fill",
    info: "bi-info-circle-fill",
  };

  const cropListings = [
    { name: "Maize",    qty: 500, price: "UGX 1,200", status: "Active",       badge: "green" },
    { name: "Beans",    qty: 200, price: "UGX 3,500", status: "Active",       badge: "green" },
    { name: "Tomatoes", qty: 80,  price: "UGX 2,000", status: "Low Stock",    badge: "gold"  },
    { name: "Cassava",  qty: 0,   price: "UGX 900",   status: "Out of Stock", badge: "gray"  },
  ];

  const recentOrders = [
    { buyer: "Nakato Rose",   crop: "Maize",    qty: "100 kg", status: "New",     badge: "blue"  },
    { buyer: "Bbosa Traders", crop: "Beans",    qty: "50 kg",  status: "Pending", badge: "gold"  },
    { buyer: "Fresh Mart",    crop: "Tomatoes", qty: "30 kg",  status: "Fulfilled", badge: "green" },
  ];

  return (
    <>
      {/* SIDEBAR (desktop) */}
      <nav className="vuna-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <i className="bi bi-flower3"></i>
          </div>
          <div>
            <div className="sidebar-brand-name">Vuna</div>
            <div className="sidebar-user">Farmer Portal</div>
          </div>
        </div>

        <div className="sidebar-nav">
          <Link to="/farmer" className="sidebar-item active">
            <i className="bi bi-house"></i> Home
          </Link>
          <Link to="/farmer/products" className="sidebar-item">
            <i className="bi bi-basket3"></i> My Crops
          </Link>
          <Link to="/farmer/products/new" className="sidebar-item">
            <i className="bi bi-plus-circle"></i> Upload Harvest
          </Link>
          <Link to="/farmer/orders" className="sidebar-item">
            <i className="bi bi-receipt"></i> Orders
          </Link>
          <Link to="/farmer/advisory" className="sidebar-item">
            <i className="bi bi-cpu"></i> AI Advisory
          </Link>
          <Link to="/farmer/inquiries" className="sidebar-item">
            <i className="bi bi-bell"></i> Notifications
          </Link>
        </div>

        <div className="sidebar-footer">
          <button
            className="sidebar-item"
            onClick={logout}
            style={{ color: "var(--danger)", width: "100%" }}
          >
            <i className="bi bi-box-arrow-right"></i> Sign Out
          </button>
        </div>
      </nav>

      {/* PAGE WRAPPER */}
      <div className="page-wrapper">

        {/* TOP NAV */}
        <nav className="vuna-topnav">
          <div className="topnav-brand">
            <div className="topnav-icon">
              <i className="bi bi-flower3"></i>
            </div>
            <div>
              <div className="topnav-title">Vuna</div>
              <div className="topnav-sub">Good morning, {farmerName}</div>
            </div>
          </div>
          <div className="topnav-actions">
            <button
              className="topnav-btn"
              onClick={() => navigate("/farmer/inquiries")}
            >
              <i className="bi bi-bell"></i>
              <span className="badge-dot"></span>
            </button>
            <button className="topnav-btn" onClick={logout}>
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <div className="page-content">

          {/* Weather Strip */}
          <div className="weather-strip">
            <i className="bi bi-cloud-sun"></i>
            <div>
              <div className="weather-temp">24°C</div>
              <div className="weather-desc">Partly Cloudy — Low rain risk today</div>
              <div className="weather-loc">Kauga, Mukono</div>
            </div>
          </div>

          {/* Alert Strip */}
          <div className="alert-strip warning">
            <i className="bi bi-exclamation-triangle"></i>
            <div>
              <strong>Heavy rain expected</strong> this Friday. Consider harvesting Maize before Thursday.
            </div>
          </div>

          {/* Stats */}
          <div className="stat-grid">
            <div className="stat-card green">
              <div className="stat-icon"><i className="bi bi-basket3"></i></div>
              <div className="stat-value">8</div>
              <div className="stat-label">Active Listings</div>
            </div>
            <div className="stat-card gold">
              <div className="stat-icon"><i className="bi bi-currency-exchange"></i></div>
              <div className="stat-value">UGX 1.2M</div>
              <div className="stat-label">Sales This Month</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="bi bi-box-seam"></i></div>
              <div className="stat-value">3</div>
              <div className="stat-label">Pending Orders</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="bi bi-check-circle"></i></div>
              <div className="stat-value">14</div>
              <div className="stat-label">Completed Sales</div>
            </div>
          </div>

          {/* My Crop Listings */}
          <div className="vuna-card-header">
            <div className="vuna-card-title">My Crop Listings</div>
            <Link to="/farmer/products" className="btn-vuna-sm">View All</Link>
          </div>
          <div className="table-wrap">
            <table className="table table-vuna table-hover">
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Qty (kg)</th>
                  <th>Price/kg</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {cropListings.map((crop) => (
                  <tr key={crop.name}>
                    <td className="fw-600">{crop.name}</td>
                    <td>{crop.qty}</td>
                    <td>{crop.price}</td>
                    <td>
                      <span className={`badge-vuna ${crop.badge}`}>{crop.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Orders */}
          <div className="vuna-card-header mt-2">
            <div className="vuna-card-title">Recent Orders</div>
            <Link to="/farmer/orders" className="btn-vuna-sm">View All</Link>
          </div>
          <div className="table-wrap">
            <table className="table table-vuna table-hover">
              <thead>
                <tr>
                  <th>Buyer</th>
                  <th>Crop</th>
                  <th>Qty</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.buyer}>
                    <td className="fw-600">{order.buyer}</td>
                    <td>{order.crop}</td>
                    <td>{order.qty}</td>
                    <td>
                      <span className={`badge-vuna ${order.badge}`}>{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Actions */}
          <div className="vuna-card-title mb-3">Quick Actions</div>
          <div className="d-grid gap-2">
            <Link
              to="/farmer/products/new"
              className="btn-vuna-primary"
              style={{ padding: "13px", textAlign: "center", textDecoration: "none", borderRadius: "12px", display: "block" }}
            >
              <i className="bi bi-upload me-2"></i> Upload New Harvest
            </Link>
            <Link
              to="/farmer/advisory"
              className="btn-vuna-ghost"
              style={{ padding: "13px", textAlign: "center", textDecoration: "none", borderRadius: "12px", display: "block" }}
            >
              <i className="bi bi-cpu me-2"></i> AI Planting Advisory
            </Link>
          </div>

        </div>{/* end page-content */}
      </div>{/* end page-wrapper */}

      {/* BOTTOM NAV (mobile) */}
      <nav className="vuna-bottom-nav">
        <Link to="/farmer" className="nav-item-b active">
          <i className="bi bi-house"></i> Home
        </Link>
        <Link to="/farmer/products" className="nav-item-b">
          <i className="bi bi-basket3"></i> Crops
        </Link>
        <Link to="/farmer/products/new" className="nav-item-b">
          <i className="bi bi-plus-circle"></i> Upload
        </Link>
        <Link to="/farmer/orders" className="nav-item-b">
          <i className="bi bi-receipt"></i> Orders
        </Link>
        <Link to="/farmer/advisory" className="nav-item-b">
          <i className="bi bi-cpu"></i> Advisory
        </Link>
      </nav>

      {/* TOAST CONTAINER */}
      <div className="vuna-toast-container" id="toastContainer">
        {toasts.map((toast) => (
          <div key={toast.id} className={`vuna-toast ${toast.type}`}>
            <i className={`bi ${toastIcons[toast.type]}`}></i>
            <div className="toast-body">
              <div className="toast-title">{toast.title}</div>
              <div className="toast-msg">{toast.msg}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}