type Props = {
    isDeleted: boolean;
    bulkAction: string;
    setBulkAction: (v: string) => void;
    onApply: () => void;
};

export default function BulkActionBar({
      isDeleted,
      bulkAction,
      setBulkAction,
      onApply,
  }: Props) {
    return (
        <div className="flex gap-2 mb-4">
            <select
                className="select select-sm"
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
            >
                <option value="">Bulk actions</option>

                {!isDeleted && <option value="trash">Move to Trash</option>}

                {isDeleted && (
                    <>
                        <option value="restore">Restore</option>
                        <option value="delete">Delete Permanently</option>
                    </>
                )}
            </select>

            <button className="btn btn-sm" onClick={onApply}>
                Apply
            </button>
        </div>
    );
}
