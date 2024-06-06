import React from "react";
import "./studentComponent.css";

type StudentComponentProps = {
    studentName: string;
};

const StudentComponent: React.FC<StudentComponentProps> = ({ studentName }) => {
    return (
        <div className="student">
            <div className="avatar"></div>
            <p className="student-name">{studentName}</p>
        </div>
    );
};

export default StudentComponent;