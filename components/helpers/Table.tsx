export const Table = ({ children }) => {
  return <table className="table-auto">{children}</table>;
};

export const TableHeadings = ({ headings }) => {
  return (
    <thead>
      <tr>
        {headings.map((heading, i) => (
          <th key={i} className="px-4 py-2">{heading}</th>
        ))}
      </tr>
    </thead>
  );
};

export const TableBody = ({ rows }) => {
  return (
    <tbody>
      {rows.map((row, i) => (
        <tr
          key={i}
          className={`text-lg pb-1 ${i % 2 !== 0 ? "bg-gray-100" : ""}`}
        >
          {row.map((value, i) => (
            <td key={i} className="border px-4 py-2 font-medium">{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
