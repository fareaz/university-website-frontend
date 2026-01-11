type Props = {
    title: string;
    value: number;
};

export default function MetricBox({ title, value }: Props) {
    return (
        <div className="card bg-base-100 shadow">
            <div className="card-body">
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
}