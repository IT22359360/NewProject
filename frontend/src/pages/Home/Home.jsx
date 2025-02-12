import React, { useState, useEffect } from "react";
import { Users, CheckCircle, XCircle, ArrowLeft, Calendar } from "lucide-react";

const Home = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]); // Store groups dynamically
  const [students, setStudents] = useState({});
  const currentDate = new Date().toLocaleDateString();

  // Fetch trainees when component loads
  useEffect(() => {
    fetchTrainees();
  }, []);

  const fetchTrainees = async () => {
    try {
      const response = await fetch(`/api/trainee/get`); // Adjust API URL if necessary
      const data = await response.json();

      // Group trainees by field of study
      const groupedTrainees = data.reduce((acc, trainee) => {
        if (!acc[trainee.Fieldofstudy]) {
          acc[trainee.Fieldofstudy] = [];
        }
        acc[trainee.Fieldofstudy].push({
          id: trainee.ID,
          name: trainee.Name,
          email: `${trainee.Name.toLowerCase().replace(" ", ".")}@example.com`, // Generate email if not available
          attendance: false,
        });
        return acc;
      }, {});

      // Convert groups to an array with counts
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
  };

  const handleAttendance = (groupName, studentId, status) => {
    setStudents((prev) => ({
      ...prev,
      [groupName]: prev[groupName].map((student) =>
        student.id === studentId ? { ...student, attendance: status } : student
      ),
    }));
  };

  const handleBack = () => {
    setSelectedGroup(null);
  };

  if (!selectedGroup) {
    return (
      <div className="p-8">
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
    );
  }

  const groupStudents = students[selectedGroup] || [];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button onClick={handleBack} className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft size={24} />
            <span className="ml-2">Back to Groups</span>
          </button>
          <h1 className="text-3xl font-bold">{selectedGroup} Group</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar size={20} />
          <span className="text-gray-600">{currentDate}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {groupStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => handleAttendance(selectedGroup, student.id, true)}
                        className={`p-2 rounded-full ${
                          student.attendance === true
                            ? "bg-green-100 text-green-600"
                            : "hover:bg-green-100 text-gray-400"
                        }`}
                      >
                        <CheckCircle size={24} />
                      </button>
                      <button
                        onClick={() => handleAttendance(selectedGroup, student.id, false)}
                        className={`p-2 rounded-full ${
                          student.attendance === false
                            ? "bg-red-100 text-red-600"
                            : "hover:bg-red-100 text-gray-400"
                        }`}
                      >
                        <XCircle size={24} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
