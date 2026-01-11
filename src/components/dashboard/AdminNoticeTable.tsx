type Props = {
    notices: any[];
    selectedIds: string[];
    onToggle: (id: string) => void;
    onToggleAll: (checked: boolean) => void;
};

export default function AdminNoticeTable({
                                             notices,
                                             selectedIds,
                                             onToggle,
                                             onToggleAll,
                                         }: Props) {
    return (
        <table className="table table-zebra w-full">
            <thead>
            <tr>
                <th>
                    <input
                        type="checkbox"
                        onChange={(e) => onToggleAll(e.target.checked)}
                    />
                </th>
                <th>Title</th>
                <th>Categories</th>
                <th>Date</th>
            </tr>
            </thead>

            <tbody>
            {notices.map((n) => (
                <tr key={n._id}>
                    <td>
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(n._id)}
                            onChange={() => onToggle(n._id)}
                        />
                    </td>
                    <td>{n.title}</td>
                    <td>{n.categories?.map((c: any) => c.name).join(", ")}</td>
                    <td>{new Date(n.createdAt).toLocaleDateString()}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
