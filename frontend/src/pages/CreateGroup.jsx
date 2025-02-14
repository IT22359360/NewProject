import React, { useState, useEffect } from 'react';

const CreateGroup = () => {
  const [category, setCategory] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filter, setFilter] = useState('');
  const [groupNumber, setGroupNumber] = useState(null);
  
  const students = [
    { id: 1, name: 'John Doe', studentId: '2345' },
    { id: 2, name: 'Jane Smith', studentId: '2346' },
    { id: 3, name: 'Alice Johnson', studentId: '2347' },
    { id: 4, name: 'Bob Brown', studentId: '2348' },
    { id: 5, name: 'Charlie Black', studentId: '2349' },
  ];

  const categories = ['UI/UX', 'Java', 'Flutter', 'Fullstack', 'PHP', 'MERN', 'C#', 'Cloud', 'Python'];

  const groupData = {
    'UI/UX': 3,
    'Java': 4,
    'Flutter': 2,
    'Fullstack': 5,
    'PHP': 1,
    'MERN': 6,
    'C#': 2,
    'Cloud': 3,
    'Python': 4,
  };

  useEffect(() => {
    if (category) {
      setGroupNumber((groupData[category] || 0) + 1);
    } else {
      setGroupNumber(null);
    }
  }, [category]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(filter.toLowerCase()) ||
    student.studentId.toLowerCase().includes(filter.toLowerCase())
  );

  const toggleStudentSelection = (id) => {
    setSelectedStudents(prevSelected =>
      prevSelected.includes(id) ? prevSelected.filter(studentId => studentId !== id) : [...prevSelected, id]
    );
  };

  const createGroup = () => {
    if (category && selectedStudents.length > 0) {
      console.log(`Creating group ${category} ${groupNumber} with students: ${selectedStudents}`);
      alert(`Group ${category} ${groupNumber} created with students: ${selectedStudents.join(', ')}`);
    } else {
      alert('Please select a category and at least one student.');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Create New Group</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600">
            <option value="">Select a Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {groupNumber !== null && (
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Group Number</label>
            <p className="text-xl font-semibold text-gray-900">{category} {groupNumber}</p>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search Students</label>
          <input 
            type="text" 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search by name or student ID"
            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Students</h3>
          <div className="overflow-y-auto max-h-72">
            {filteredStudents.map(student => (
              <div key={student.id} className="flex items-center justify-between p-4 border-b border-gray-300">
                <div>
                  <p className="text-lg font-medium">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.studentId}</p>
                </div>
                <button 
                  onClick={() => toggleStudentSelection(student.id)} 
                  className={`px-4 py-2 rounded-md ${selectedStudents.includes(student.id) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-700 focus:outline-none`}>
                  {selectedStudents.includes(student.id) ? 'Selected' : 'Select'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={createGroup} 
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
          Create Group
        </button>
      </div>
    </div>
  );
};

export default CreateGroup;
