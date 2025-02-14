import React, { useState, useEffect } from "react";
import { Users, CheckCircle, XCircle, ArrowLeft, Calendar, Search, Eye } from "lucide-react";

const Home = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState({});
  const [attendanceData, setAttendanceData] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTraineeAttendance, setSelectedTraineeAttendance] = useState([]);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [dailyAttendance, setDailyAttendance] = useState({});

  useEffect(() => {
    fetchTrainees();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      fetchDailyAttendance();
    }
  }, [date, selectedGroup]);

  const fetchDailyAttendance = async () => {
    try {
      const response = await fetch(`/api/attendance/daily/${date}`);
      const data = await response.json();
      
      // Convert array to object with traineeID as key for easier lookup
      const attendanceMap = data.reduce((acc, record) => {
        acc[record.traineeID] = record.status;
        return acc;
      }, {});
      
      setDailyAttendance(attendanceMap);
      // Clear any pending attendance changes
      setAttendanceData({});
    } catch (error) {
      console.error("Error fetching daily attendance:", error);
    }
  };

  const fetchTrainees = async () => {
    try {
      const response = await fetch(`/api/trainee/get`);
      const data = await response.json();

      const groupedTrainees = data.reduce((acc, trainee) => {
        if (!acc[trainee.Fieldofstudy]) {
          acc[trainee.Fieldofstudy] = [];
        }
        acc[trainee.Fieldofstudy].push({
          id: trainee.ID,
          name: trainee.Name,
          attendance: null,
        });
        return acc;
      }, {});

      const formattedGroups = Object.keys(groupedTrainees).map((field, index) => ({
        id: index + 1,
        name: field,
        students: groupedTrainees[field].length,
      }));

      setGroups(formattedGroups);
      setStudents(groupedTrainees);
    } catch (error) {
      console.error("Error fetching trainees:", error);
    }
  };

  const handleGroupClick = (groupName) => {
    setSelectedGroup(groupName);
    setAttendanceData({});
  };

  const handleBack = () => {
    setSelectedGroup(null);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleAttendance = (groupName, studentId, status) => {
    // Only allow changing attendance if no status exists for this date
    if (!dailyAttendance[studentId]) {
      setAttendanceData((prev) => ({
        ...prev,
        [`${groupName}-${studentId}`]: {
          traineeID: studentId,
          status,
          date,
        },
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const attendanceList = Object.values(attendanceData);
      if (attendanceList.length === 0) {
        alert("No attendance changes to submit.");
        return;
      }

      const response = await fetch("/api/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attendanceList),
      });

      if (!response.ok) throw new Error("Failed to submit attendance");

      alert("Attendance submitted successfully");
      // Refresh the daily attendance after submission
      fetchDailyAttendance();
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };

  const fetchTraineeAttendance = async (traineeID) => {
    try {
      const response = await fetch(`/api/attendance/trainee/${traineeID}`);
      const data = await response.json();
      setSelectedTraineeAttendance(data);
      setIsAttendanceModalOpen(true);
    } catch (error) {
      console.error("Error fetching trainee attendance:", error);
    }
  };

  const getAttendanceStatus = (studentId) => {
    // Check if there's a pending change
    const pendingKey = `${selectedGroup}-${studentId}`;
    if (attendanceData[pendingKey]) {
      return attendanceData[pendingKey].status;
    }
    // Otherwise return the saved status for this date
    return dailyAttendance[studentId];
  };

  const groupStudents = students[selectedGroup] || [];
  const filteredStudents = groupStudents.filter((student) =>
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      {!selectedGroup ? (
        <div>
          <h1 className="text-3xl font-bold mb-8">Course Groups</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => handleGroupClick(group.name)}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center space-y-4">
                  <Users size={48} className="text-blue-600" />
                  <h2 className="text-xl font-semibold">{group.name}</h2>
                  <p className="text-gray-600">{group.students} Students</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button onClick={handleBack} className="flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft size={24} />
                <span className="ml-2">Back to Groups</span>
              </button>
              <h1 className="text-3xl font-bold">{selectedGroup} Group</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Calendar size={20} />
              <input
                type="date"
                value={date}
                onChange={(e) => handleDateChange(e.target.value)}
                className="border rounded px-2 py-1"
              />
            </div>
          </div>

          <div className="flex items-center mb-4">
            <Search size={20} className="mr-2" />
            <input
              type="text"
              placeholder="Search by Trainee ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded px-3 py-1"
            />
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    View
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => {
                  const status = getAttendanceStatus(student.id);
                  const isMarked = status !== undefined;
                  
                  return (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {isMarked ? (
                          <div className="flex justify-center items-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full ${
                              status === "Present" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {status}
                            </span>
                          </div>
                        ) : (
                          <div className="flex justify-center space-x-4">
                            <button
                              onClick={() => handleAttendance(selectedGroup, student.id, "Present")}
                              className="p-2 rounded-full hover:bg-green-100 text-gray-400"
                            >
                              <CheckCircle size={24} />
                            </button>
                            <button
                              onClick={() => handleAttendance(selectedGroup, student.id, "Absent")}
                              className="p-2 rounded-full hover:bg-red-100 text-gray-400"
                            >
                              <XCircle size={24} />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => fetchTraineeAttendance(student.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye size={24} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {!Object.keys(dailyAttendance).length && (
            <button
              onClick={handleSubmit}
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
              Submit Attendance
            </button>
          )}
        </div>
      )}

      {/* Custom Modal using Tailwind CSS */}
      {isAttendanceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Attendance Records</h2>
              <button
                onClick={() => setIsAttendanceModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle size={24} />
              </button>
            </div>
            
            {selectedTraineeAttendance.length > 0 ? (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedTraineeAttendance.map((record) => (
                    <tr key={record._id}>
                      <td className="px-4 py-2">{new Date(record.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{record.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No attendance records found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;