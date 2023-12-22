import React, { useState } from 'react';
import axios from 'axios';
import './Newc.css'; 

const Newc = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    instructor: '',
    description: '',
    enrollmentStatus: '',
    thumbnail: '',
    duration: '',
    schedule: '',
    location: '',
    syllabus: [{ week: '', topic: '', content: '' }],
    students: [{ id: '', name: '', email: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSyllabusChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSyllabus = [...formData.syllabus];
    updatedSyllabus[index] = { ...updatedSyllabus[index], [name]: value };
    setFormData({ ...formData, syllabus: updatedSyllabus });
  };

  const handleStudentsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedStudents = [...formData.students];
    updatedStudents[index] = { ...updatedStudents[index], [name]: value };
    setFormData({ ...formData, students: updatedStudents });
  };

  const addSyllabus = () => {
    setFormData({ ...formData, syllabus: [...formData.syllabus, { week: '', topic: '', content: '' }] });
  };

  const addStudent = () => {
    setFormData({ ...formData, students: [...formData.students, { id: '', name: '', email: '' }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://655500aa63cafc694fe75243.mockapi.io/course', formData);
      console.log('Data saved successfully:', response.data);
      setFormData({
        id: '',
        name: '',
        instructor: '',
        description: '',
        enrollmentStatus: '',
        thumbnail: '',
        duration: '',
        schedule: '',
        location: '',
        syllabus: [{ week: '', topic: '', content: '' }],
        students: [{ id: '', name: '', email: '' }],
      });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      <label>
        Course ID:
        <input type="text" name="id" value={formData.id} onChange={handleChange} />
      </label>

      <label>
        Course Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>

      <label>
        Instructor:
        <input type="text" name="instructor" value={formData.instructor} onChange={handleChange} />
      </label>

      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </label>

      <label>
        Enrollment Status:
        <input type="text" name="enrollmentStatus" value={formData.enrollmentStatus} onChange={handleChange} />
      </label>

      <label>
        Thumbnail URL:
        <input type="text" name="thumbnail" value={formData.thumbnail} onChange={handleChange} />
      </label>

      <label>
        Duration:
        <input type="text" name="duration" value={formData.duration} onChange={handleChange} />
      </label>

      <label>
        Schedule:
        <input type="text" name="schedule" value={formData.schedule} onChange={handleChange} />
      </label>

      <label>
        Location:
        <input type="text" name="location" value={formData.location} onChange={handleChange} />
      </label>

      <h3>Syllabus:</h3>
      {formData.syllabus.map((item, index) => (
        <div key={index}>
          <label>
            Week:
            <input type="text" name="week" value={item.week} onChange={(e) => handleSyllabusChange(index, e)} />
          </label>
          <label>
            Topic:
            <input type="text" name="topic" value={item.topic} onChange={(e) => handleSyllabusChange(index, e)} />
          </label>
          <label>
            Content:
            <textarea name="content" value={item.content} onChange={(e) => handleSyllabusChange(index, e)} />
          </label>
        </div>
      ))}
      <button type="button" onClick={addSyllabus}>
        Add Week
      </button>

      <h3>Students:</h3>
      {formData.students.map((student, index) => (
        <div key={index}>
          <label>
            Student ID:
            <input type="text" name="id" value={student.id} onChange={(e) => handleStudentsChange(index, e)} />
          </label>
          <label>
            Student Name:
            <input type="text" name="name" value={student.name} onChange={(e) => handleStudentsChange(index, e)} />
          </label>
          <label>
            Student Email:
            <input type="text" name="email" value={student.email} onChange={(e) => handleStudentsChange(index, e)} />
          </label>
        </div>
      ))}
      <button type="button" onClick={addStudent}>
        Add Student
      </button>

      <button type="submit">Save Data</button>
      </form>
    </div>
    
  );
};

export default Newc;
