import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Report = () => {
  const attendanceData = [
    { name: "UIUX", value: 10 },
    { name: "Flutter", value: 1 },
    { name: "FullStack", value: 4 },
    { name: "PHP", value: 5 },
    { name: "MERN", value: 6 },
    { name: "C#", value: 3 },
    { name: "Cloud", value: 2 },
    { name: "JAVA", value: 7 },
    { name: "Python", value: 2 },
  ];

  const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
    "#A020F0", "#FF5733", "#C70039", "#900C3F", "#581845"
  ];

  const totalValue = attendanceData.reduce((acc, item) => acc + item.value, 0);

  // Get current date and time
  const now = new Date();
  const currentDate = now.toLocaleDateString(); // Format: MM/DD/YYYY
  const currentTime = now.toLocaleTimeString(); // Format: HH:MM:SS AM/PM

  const renderCustomizedLabel = ({ percent }) => {
    return `${(percent * 100).toFixed(0)}%`;
  };

  const downloadPDF = () => {
    const input = document.getElementById("chart-container");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 180;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text("Trainee Attendance Report", 15, 15);
      pdf.setFontSize(12);
      pdf.text(`Generated on: ${currentDate} at ${currentTime}`, 15, 25);

      pdf.addImage(imgData, "PNG", 15, 40, imgWidth, imgHeight);
      pdf.save("Trainee_Attendance_Report.pdf");
    });
  };

  return (
    <div className="p-8 min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-full max-w-4xl border rounded-lg shadow-lg p-8 bg-white">
        
        {/* Pie Chart on the Left */}
        <div id="chart-container" className="w-1/2 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Trainee Attendance Distribution</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={attendanceData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {attendanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${((value / totalValue) * 100).toFixed(0)}%`} />
            <Legend />
          </PieChart>
        </div>

        {/* Information on the Right (Aligned Parallel to Pie Chart) */}
        <div className="w-1/2 flex flex-col items-end justify-center text-right">
          <h1 className="text-2xl font-bold mb-2">Trainee Attendance Report</h1>
          <p className="text-lg text-gray-700">📅 Date: {currentDate}</p>
          <p className="text-lg text-gray-700 mb-6">⏰ Time: {currentTime}</p>
          
          <button
            onClick={downloadPDF}
            className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            📥 Download Report
          </button>
        </div>

      </div>
    </div>
  );
};

export default Report;
