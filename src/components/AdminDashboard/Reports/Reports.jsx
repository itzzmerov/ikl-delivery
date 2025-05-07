import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Reports = () => {
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders");
        const orderSnapshot = await getDocs(ordersCollection);
        const orderList = orderSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const formatDate = (firebaseTimestamp) => {
    if (!firebaseTimestamp) return "N/A";
    const date = firebaseTimestamp.toDate ? firebaseTimestamp.toDate() : new Date(firebaseTimestamp);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const isWithinRange = (date) => {
    if (!startDate && !endDate) return true;
    const selectedDate = new Date(date.toDate ? date.toDate() : date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) return selectedDate >= start && selectedDate <= end;
    if (start) return selectedDate >= start;
    if (end) return selectedDate <= end;

    return true;
  };

  const filteredOrders = orders.filter(
    (order) => order.status === "Completed" && isWithinRange(order.createdAt)
  );

  const serviceData = filteredOrders.reduce((acc, order) => {
    const date = new Date(order.createdAt.toDate ? order.createdAt.toDate() : order.createdAt);
    const month = date.toLocaleString("en-US", { month: "long" });
    const service = order.service;

    if (!acc[month]) acc[month] = {};
    if (!acc[month][service]) acc[month][service] = 0;
    acc[month][service]++;

    return acc;
  }, {});

  const chartData = Object.keys(serviceData).map((month) => ({
    month,
    ...serviceData[month],
  }));

  const exportToPDF = async () => {
    const doc = new jsPDF();
    const tableColumn = ["Date", "Service", "Customer Name", "Phone Number", "Address", "Rider Name", "Delivery Fee"];
    const tableRows = filteredOrders.map((order) => [
      formatDate(order.updatedAt),
      order.service,
      order.customerFirstName + " " + order.customerLastName,
      order.phoneNumber,
      order.address || order.customerAddress || "N/A",
      order.riderName,
      order.basePrice,
    ]);

    doc.text("Filtered Completed Orders Report", 14, 15);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });

    const chartElement = document.getElementById("chartCapture");
    if (chartElement) {
      const canvas = await html2canvas(chartElement);
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 10, doc.autoTable.previous.finalY + 10, 180, 100);
    }

    doc.save("Filtered_Completed_Orders_Report.pdf");
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Generate Reports</h1>

      <div className="flex justify-between mb-4">
        <div className="flex">
          <div className="mr-4">
            <label className="block text-gray-700 font-bold mb-2">Start Date:</label>
            <input type="date" className="border px-4 py-2 rounded-md" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">End Date:</label>
            <input type="date" className="border px-4 py-2 rounded-md" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
        <button onClick={exportToPDF} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md mb-4">Export to PDF</button>
      </div>

      <div id="chartCapture" className="mt-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(serviceData[Object.keys(serviceData)[0]] || {}).map((service) => (
              <Bar key={service} dataKey={service} fill="#8884d8" />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <table className="mt-6 w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Service</th>
            <th className="border px-4 py-2">Customer Name</th>
            <th className="border px-4 py-2">Phone Number</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Rider Name</th>
            <th className="border px-4 py-2">Delivery Fee</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{formatDate(order.updatedAt)}</td>
              <td className="border px-4 py-2">{order.service}</td>
              <td className="border px-4 py-2">{order.customerFirstName + " " + order.customerLastName}</td>
              <td className="border px-4 py-2">{order.phoneNumber}</td>
              <td className="border px-4 py-2">{order.address || order.customerAddress || "N/A"}</td>
              <td className="border px-4 py-2">{order.riderName}</td>
              <td className="border px-4 py-2">{order.basePrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
