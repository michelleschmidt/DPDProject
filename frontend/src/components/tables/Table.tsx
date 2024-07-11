import React, { useState } from "react";

interface GenericTableProps {
  data: any[];
  columns: string[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const GenericTable: React.FC<GenericTableProps> = ({
  data,
  columns,
  onEdit,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
    columns.some(
      (column) =>
        item[column] &&
        item[column].toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
            {(onEdit || onDelete) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>{item[column]?.toString() || ""}</td>
              ))}
              {(onEdit || onDelete) && (
                <td>
                  {onEdit && <button onClick={() => onEdit(item)}>Edit</button>}
                  {onDelete && (
                    <button onClick={() => onDelete(item)}>Delete</button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
